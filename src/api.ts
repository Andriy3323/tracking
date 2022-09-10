const API_URL = 'https://api.novaposhta.ua/v2.0/json/';

export const getParcel = (query: string) => {
  return fetch(API_URL, {
    body: JSON.stringify({
      apiKey: 'fe957f3d66c55b6a8d1b51d10d387d0c',
      modelName: 'TrackingDocument',
      calledMethod: 'getStatusDocuments',
      methodProperties: {
        Documents : [
        {
        DocumentNumber: query,
        Phone:'380600000000'
        }]
      }
    }),
    method: 'POST'
  })
    .then(response => response.json())
    .catch(() => ({
      success: false,
      warning: 'Entered document number is incorrect'
    }));
};