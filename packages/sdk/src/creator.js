export const create = async (formData) => {
  fetch("http://localhost:4050/create", {
    method: "POST",
    body: formData,
  })
    .then((res) => console.log(res))
    .catch((err) => ("Error occured", err));
};
