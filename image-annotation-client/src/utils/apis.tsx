import API from './axiosInstance';

export const getUserDetailsApi = async () => {
  const res: any = await API.get('api/v1/get-user-info').catch(err => err);
  return res
}

export const LoginApi = async (formData: any) => {
  const res: any = await API.post('api/v1/auth/login', formData).catch(err => err);
  return res
}

export const logoutApi = async () => {}

export const registerUserApi =  async (formData: any) => {
  const res: any = await API.post('api/v1/register-user', formData).catch(err => err);
  return res;
}

export const uploadFile =  async () => {
  const res: any = await API.post('api/v1/upload-image').catch(err => err);
  return res;
}

export const getUploadedImages = async () => {
  const res: any = await API.get('api/v1/images').catch(err => err);
  return res
}

export const getImageAnnotationAPI = async (imageId: number) => {
  const res : any = await API.get(`api/v1/image/${imageId}`).catch(err => err);
  return res
}

export const saveImageAnnotationAPI = async (imageId: number, annotations: any) => {
  const res: any = await API.post(`api/v1/image/${imageId}`, {annotations: annotations}).catch(err => err);
  return res
}

export const resetAnnotationsAPI = async (imageId: number) => {
  return await API.post(`api/v1/image/${imageId}/rest-annotation`).catch(err => err);
}

export const getUserAnnotationsAPI = async () => {
  return await API.get(`api/v1/my-annotations`).catch(err => err);
}