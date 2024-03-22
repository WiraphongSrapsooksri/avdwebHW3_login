// Service.tsx
import landmark from "../assets/landmarks.json";
import usersData from "../assets/users.json";
import { LandMarkModel } from "../model/LandMarkModel";
import { UserModel } from "../model/UserModel";

// ฟังก์ชันเพื่อค้นหาผู้ใช้ตาม username
export const getUser = (username: string): UserModel | undefined => {
  return usersData.find((user: UserModel) => user.username === username);
};

export const getUserAll = (): UserModel[] => {
  return usersData;
}

export const getLandmarksAll = (): LandMarkModel[] => {
  return landmark;
}

export const login = (username: string, password: string): string | null => {
  const user = getUser(username);  
  if (user && user.password === password) {
    saveUserData(user);
    return user.typeuser; 
  }
  return null; 
};

const encodeData = (data: object) => {
  return btoa(encodeURIComponent(JSON.stringify(data)));
};

// ฟังก์ชันเพื่อเก็บข้อมูลผู้ใช้ที่เข้ารหัสลงใน localStorage
const saveUserData = (user: object) => {
  const encodedData = encodeData(user);
  localStorage.setItem('user', encodedData);
};

// ฟังก์ชันเพื่อถอดรหัสข้อมูลจาก localStorage
export const decodeData = (encodedData: string) => {
  const decodedData = decodeURIComponent(atob(encodedData));
  return JSON.parse(decodedData);
};
