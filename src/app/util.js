const Util = {};

Util.fetchJSONData = async (file = false, complete, context)=> {
  try {
    const basePath = context.store.baseJSONPath;
    const response = await fetch(`${basePath + file}.json`);
    const json = await response.json();

    if (typeof complete === 'function') {
      complete(json);
    }
  } catch (err) {
    console.error(err);
  }
}

export default Util;