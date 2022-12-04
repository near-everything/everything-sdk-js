// TODO: assign types
// {
//   characteristics: "[{attributeId: text, optionId: text}]",
//   creatorId: "creator", // I wonder if this can come from context?
//   privacySetting: "Private", // this will actually come from the pile it is a part of... but that's for later
//   files: File,
//   files: base64 <- can we change this to File? this should happen within the component
// }
export const createThing = async (formData) => {
  // call the api, this will need the accesstoken, which will be grabbed from context
  fetch("http://localhost:4050/create", {
    method: "POST",
    body: formData,
  })
    .then((res) => console.log(res))
    .catch((err) => ("Error occured", err));
  // if successful and privacySetting is public, then mint on chain
  // this will need the wallet
};

export const attachImage = async () => {};
