//import api from "@/api";
import api from "@/api/ex_index"

const BASE_URL = "/community";
const headers = { "Content-Type": "multipart/form-data" };

export default {
  // 게시글 목록 조회
  async list(category, type) {
    const params=new URLSearchParams();
    if(category !== -1) params.append("category", category);
    if(type !== -1) params.append("type", type);

    const response = await api.get(`${BASE_URL}`, {params});
    console.log("COMMUNITY GET LIST", response); // API에서 반환되는 데이터를 로그로 확인
    return response; //data 속성을 반환하지 않고 전체 응답을 반환
  },

  // 게시글 상세 조회
  async detail(postId) {
    const response = await api.get(`${BASE_URL}/${postId}`);
    console.log("COMMUNITY GET DETAIL", response);
    return response.data;
  },

  // 게시글 작성
  async write(post) {
    const formData = new FormData();
    for (const key in post) {
      formData.append(key, post[key]);
    }

    const response = await api.post(`${BASE_URL}/write`, formData, { headers });
    console.log("COMMUNITY POST WRITE", response);
    return response.data;
  },

  // 게시글 좋아요
  async likePost(postId) {
    const response = await api.post(`${BASE_URL}/${postId}/like`);
    console.log("COMMUNITY POST LIKE", response);
    return response.data;
  },

  // 게시글 수정
  async update(postId, post) {
    const formData = new FormData();
    for (const key in post) {
      formData.append(key, post[key]);
    }
    const response = await api.post(`${BASE_URL}/${postId}/update`, formData, { headers });
    console.log("COMMUNITY POST UPDATE", response);
    return response.data;
  },

  // 게시글 삭제
  async delete(postId) {
    const response = await api.delete(`${BASE_URL}/${postId}/delete`);
    console.log("COMMUNITY DELETE", response);
    return response.data;
  },
};