// src/services/DataService.js

import cursosData from '../../assets/cursos/js/cursos.json';

// =======================================================================
// === OBJETO DE MAPEAMENTO DE MÓDULOS (já estava assim) ===
// =======================================================================
const allModulesData = {
  'construcao_de_sites_1': require('../../assets/cursos/construcao_de_sites_1/_modulos.json'),
  'engenharia_de_software': require('../../assets/cursos/engenharia_de_software/_modulos.json'),
  'programacao_1_js': require('../../assets/cursos/programacao_1_js/_modulos.json'),
  'programacao_1_python': require('../../assets/cursos/programacao_1_python/_modulos.json'),
  'portugues_para_concursos': require('../../assets/cursos/portugues_para_concursos/_modulos.json'),
  'raciocinio_e_matematica': require('../../assets/cursos/raciocinio_e_matematica/_modulos.json'),
  'informatica_para_concursos': require('../../assets/cursos/informatica_para_concursos/_modulos.json'),
  'producao_textual': require('../../assets/cursos/producao_textual/_modulos.json'),
};

// =======================================================================
// === NOVO OBJETO DE MAPEAMENTO PARA CONTEÚDO HTML (CADA LIÇÃO) ===
// =======================================================================
const allHtmlLessonContent = {
  'construcao_de_sites_1': {
    '01_introducao_html': require('../../assets/cursos/construcao_de_sites_1/html_content/01_introducao_html.js').default,
    '02_estrutura_basica_documento_html': require('../../assets/cursos/construcao_de_sites_1/html_content/02_estrutura_basica_documento_html.js').default,
    '03_tags_html_basicas': require('../../assets/cursos/construcao_de_sites_1/html_content/03_tags_html_basicas.js').default,
    '04_tags_multimidia': require('../../assets/cursos/construcao_de_sites_1/html_content/04_tags_multimidia.js').default,
    '05_tags_formatacao': require('../../assets/cursos/construcao_de_sites_1/html_content/05_tags_formatacao.js').default,
    '06_tags_tabelas': require('../../assets/cursos/construcao_de_sites_1/html_content/06_tags_tabelas.js').default,
    '07_tags_listas': require('../../assets/cursos/construcao_de_sites_1/html_content/07_tags_listas.js').default,
    '08_tags_iframes': require('../../assets/cursos/construcao_de_sites_1/html_content/08_tags_iframes.js').default,
    '09_tags_formularios': require('../../assets/cursos/construcao_de_sites_1/html_content/09_tags_formularios.js').default,
    '10_tag_input': require('../../assets/cursos/construcao_de_sites_1/html_content/10_tag_input.js').default,
    '11_tags_textarea_select': require('../../assets/cursos/construcao_de_sites_1/html_content/11_tags_textarea_select.js').default,
    '12_outras_tags_uteis': require('../../assets/cursos/construcao_de_sites_1/html_content/12_outras_tags_uteis.js').default,
  },
};

// =======================================================================
// === NOVO OBJETO DE MAPEAMENTO PARA EXERCÍCIOS JSON (CADA EXERCÍCIO) ===
// =======================================================================
const allExerciseContent = {
  'construcao_de_sites_1': {
    '01_introducao_html': require('../../assets/cursos/construcao_de_sites_1/01_introducao_html.json'),
    '02_estrutura_basica_documento_html': require('../../assets/cursos/construcao_de_sites_1/02_estrutura_basica_documento_html.json'),
    '03_tags_html_basicas': require('../../assets/cursos/construcao_de_sites_1/03_tags_html_basicas.json'),
    '04_tags_multimidia': require('../../assets/cursos/construcao_de_sites_1/04_tags_multimidia.json'),
    '05_tags_formatacao': require('../../assets/cursos/construcao_de_sites_1/05_tags_formatacao.json'),
    '06_tags_tabelas': require('../../assets/cursos/construcao_de_sites_1/06_tags_tabelas.json'),
    '07_tags_listas': require('../../assets/cursos/construcao_de_sites_1/07_tags_listas.json'),
    '08_tags_iframes': require('../../assets/cursos/construcao_de_sites_1/08_tags_iframes.json'),
    '09_tags_formularios': require('../../assets/cursos/construcao_de_sites_1/09_tags_formularios.json'),
    '10_tag_input': require('../../assets/cursos/construcao_de_sites_1/10_tag_input.json'),
    '11_tags_textarea_select': require('../../assets/cursos/construcao_de_sites_1/11_tags_textarea_select.json'),
    '12_outras_tags_uteis': require('../../assets/cursos/construcao_de_sites_1/12_outras_tags_uteis.json'),
  },
};


export const loadAllCourses = () => {
  return cursosData;
};

export const loadModulesForCourse = async (courseId) => {
  if (allModulesData[courseId]) {
    return allModulesData[courseId];
  } else {
    console.error(`Módulos não encontrados ou não mapeados para o curso: ${courseId}`);
    return null;
  }
};

export const loadLessonContent = async (courseId, lessonId, type) => {
  try {
    if (type === 'html') {
      if (allHtmlLessonContent[courseId] && allHtmlLessonContent[courseId][lessonId]) {
        return allHtmlLessonContent[courseId][lessonId];
      } else {
        console.warn(`HTML da lição ${lessonId} não encontrado localmente para o curso ${courseId}.`);
        return `<h1>Conteúdo não encontrado para "${lessonId}"</h1><p>Verifique o mapeamento em DataService.js ou se o arquivo .js da lição existe.</p>`;
      }
    } else if (type === 'json') {
      const exerciseKey = lessonId;
      if (allExerciseContent[courseId] && allExerciseContent[courseId][exerciseKey]) {
        return allExerciseContent[courseId][exerciseKey];
      } else {
        console.warn(`Exercício JSON ${exerciseKey} não encontrado localmente para o curso ${courseId}. Retornando array vazio.`);
        return []; // Retorna um array vazio se não houver exercícios para esta lição
      }
    }
  } catch (error) {
    console.error(`Erro ao carregar conteúdo da lição ${lessonId} (${type}):`, error);
    return null;
  }
  return null;
};