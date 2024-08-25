export const getTransformedCountryOptions = (country = []) => {
  const allCountrys = country?.map(item => ({
    value: item?.id,
    label: item?.common_name,
  }));

  return allCountrys || [];
};
export const getTransformedTimeZoneOptions = (timeZone = []) => {
  const allCountrytimeZone = timeZone?.map(item => ({
    value: item?.id,
    label: item?.timezone,
  }));

  return allCountrytimeZone || [];
};
export const getAllServicesOptions = (services = []) => {
  const allServices = services?.map(item => ({
    value: item?.id,
    label: item?.name,
    price: item?.price,
  }));

  return allServices || [];
};

export const transformToFormData = values => {
  const formData = new FormData();
  Object.entries(values).forEach(([key]) => {
    if (key !== 'company_images' && key !== 'order' && key !== 'email' && key !== 'image' && key !== 'city') {
      formData.append(`${key}`, values[key]);
    }
  });

  if (values?.email) {
    formData.append('email', values?.email);
  }

  if (values?.order) {
    formData.append('order', values?.order);
  }

  if (values?.image && typeof values?.image !== 'string') {
    formData.append('image', values?.image, values?.image?.name);
  }

  // Append Images array
  if (values?.company_images) {
    values?.company_images?.forEach((image, index) => {
      formData.append(`company_images[${index}]file`, image);
    });
  }

  // Append Cities array
  if (values?.city) {
    values?.city?.forEach((city, index) => {
      formData.append(`serviceCities[${index}]city`, city);
    });
  }

  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  return formData;
};

export const showFormData = formData => {
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  return formDataObject;
};
