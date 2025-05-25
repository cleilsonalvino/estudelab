// src/services/ProgressService.js

import AsyncStorage from "@react-native-async-storage/async-storage";

// Keys for AsyncStorage
const PROGRESS_KEY = "user_course_progress"; // For individual lesson/course progress
const USER_DATA_KEY = "user_profile_data";   // For user-specific data like XP, Level

// --- Helper Functions for XP and Level Calculation ---
const calculateXpAndLevel = (currentXp, xpAmount) => {
    const xpPerLevel = 100; // Example: 100 XP to level up
    let newTotalXp = currentXp + xpAmount;
    let newLevel = Math.floor(newTotalXp / xpPerLevel) + 1; // Level 1 starts with 0 XP

    return { newTotalXp, newLevel };
};

// --- Functions for Lesson Progress ---

/**
 * Loads all user course progress from AsyncStorage.
 * @returns {Object} An object where keys are courseIds and values are course progress objects.
 */
export const loadProgress = async () => {
    try {
        const progressString = await AsyncStorage.getItem(PROGRESS_KEY);
        return progressString ? JSON.parse(progressString) : {};
    } catch (error) {
        console.error("Error loading progress from AsyncStorage:", error);
        return {};
    }
};

/**
 * Saves/updates progress for a specific lesson and updates user XP/Level.
 * @param {string} userId - The ID of the current user.
 * @param {string} courseId - The ID of the course.
 * @param {string} lessonId - The ID of the lesson.
 * @param {Array<Object>} modules - The full array of modules for the current course.
 * @param {number} lessonScore - The score achieved for the lesson.
 * @returns {Object|null} The updated user data (XP, Level) or null on error.
 */
export const saveProgress = async (userId, courseId, lessonId, modules, lessonScore) => {
    try {
        // 1. Load current progress data
        let progress = await loadProgress();

        // 2. Initialize course progress if it doesn't exist
        if (!progress[courseId]) {
            let totalLessonsInCourse = 0;
            if (modules && Array.isArray(modules)) {
                for (const module of modules) {
                    if (module.licoes && Array.isArray(module.licoes)) {
                        totalLessonsInCourse += module.licoes.length;
                    }
                }
            } else {
                console.warn("Warning: 'modules' array is missing or invalid. Cannot calculate totalLessonsInCourse.");
                // Decide how to handle this:
                // For now, we'll set a default or just return null if modules are critical.
                // Setting to 1 for a single lesson to ensure progress can start.
                totalLessonsInCourse = 1;
            }

            progress[courseId] = {
                dataInicio: Date.now(),
                licoesConcluidas: 0,
                licoesTotal: totalLessonsInCourse,
                notaTotal: 0,
                lessons: {}, // Store individual lesson scores within the course
            };
        }

        // 3. Update lesson progress
        const xpToEarnForLesson = 10; // XP gained per unique lesson completion
        let lessonAlreadyCompleted = progress[courseId].lessons[lessonId] !== undefined;

        // If this is a new completion for this lesson, increment count and add XP
        if (!lessonAlreadyCompleted) {
            progress[courseId].licoesConcluidas++;
            // Only add XP if it's the first time this lesson is completed
            // XP will be handled separately below to update user_profile_data
        } else {
            // If re-completing, adjust total score by removing old score before adding new one
            progress[courseId].notaTotal -= progress[courseId].lessons[lessonId];
        }

        progress[courseId].lessons[lessonId] = lessonScore; // Save/update the new score
        progress[courseId].notaTotal += lessonScore;

        // Check if all lessons in the course are completed
        if (progress[courseId].licoesConcluidas >= progress[courseId].licoesTotal) {
            progress[courseId].dataFim = Date.now();
        }

        // 4. Save updated course progress to AsyncStorage
        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
        console.log("Lesson progress saved to AsyncStorage.");

        // 5. Update User XP and Level
        let userData = JSON.parse(await AsyncStorage.getItem(USER_DATA_KEY)) || { xp: 0, level: 1 };
        
        // Only award XP if the lesson wasn't previously completed
        if (!lessonAlreadyCompleted) {
            const { newTotalXp, newLevel } = calculateXpAndLevel(userData.xp, xpToEarnForLesson);
            userData.xp = newTotalXp;
            userData.level = newLevel;
            console.log(`XP gained: ${xpToEarnForLesson}. New XP: ${userData.xp}, New Level: ${userData.level}`);
        } else {
            console.log("Lesson already completed, no new XP awarded.");
        }
        
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        console.log("User XP and Level updated in AsyncStorage.");

        return userData; // Return updated user data (XP, Level) for UI update
    } catch (error) {
        console.error("Error saving progress and XP to AsyncStorage:", error);
        return null;
    }
};

// --- Functions for User Data (XP, Level) ---

/**
 * Loads user-specific data (like XP and Level) from AsyncStorage.
 * @returns {Object} An object containing user's XP and Level, or defaults.
 */
export const loadUserData = async () => {
    try {
        const userDataString = await AsyncStorage.getItem(USER_DATA_KEY);
        return userDataString ? JSON.parse(userDataString) : { xp: 0, level: 1 };
    } catch (error) {
        console.error("Error loading user data from AsyncStorage:", error);
        return { xp: 0, level: 1 }; // Return default if error occurs
    }
};

/**
 * Clears all progress and user data from AsyncStorage.
 */
export const clearAllLocalData = async () => {
    try {
        await AsyncStorage.removeItem(PROGRESS_KEY);
        await AsyncStorage.removeItem(USER_DATA_KEY);
        console.log("All local caches (progress and user data) cleared successfully!");
    } catch (error) {
        console.error("Error clearing local caches:", error);
    }
};