const constants = (() => {
  const DATA_DIR = '../data';
  const DATASET_DIR = `${DATA_DIR}/dataset`
  const JS_OBJECTS = '../common/js_objects'

  return {
    DATA_DIR,
    DATASET_DIR,
    RAW_DIR: `${DATA_DIR}/raw`,
    JSON_DIR: `${DATASET_DIR}/json`,
    IMG_DIR: `${DATASET_DIR}/img`,
    SAMPLES: `${DATASET_DIR}/samples.json`,
    SAMPLES_JS: `${JS_OBJECTS}/samples.js`,
  }
})();

if (typeof module !== 'undefined') module.exports = constants