import api from '@/api';

const BASE_URL = '/community';
const headers = {
  'Content-Type': 'multipart/form-data',
};

export default {
  // 게시글 목록 조회
  async list(
    category,
    type,
    currentPage = 0,
    pageSize = 10
  ) {
    const formData = new FormData(); // FormData 객체 생성
    if (category !== -1)
      formData.append('category', category);
    if (type !== -1)
      formData.append('type', type);

    formData.append('limit', pageSize);
    formData.append('offset', currentPage);

    const response = await api.post(
      `${BASE_URL}`,
      formData,
      { headers }
    );
    console.log('COMMUNITY GET LIST', response); // API에서 반환되는 데이터를 로그로 확인
    return response; //data 속성을 반환하지 않고 전체 응답을 반환
  },

  // 게시글 상세 조회
  async detail(postId) {
    const response = await api.get(
      `${BASE_URL}/${postId}`
    );
    console.log(
      'COMMUNITY GET DETAIL',
      response.data
    ); //받아온 데이터 출력
    return response.data;
  },

  //게시글작성
  async write(formData) {
    try {
      console.log('서버로 보내는 데이터:');
      for (let [
        key,
        value,
      ] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await api.post(
        `${BASE_URL}/write`,
        formData,
        {
          headers,
        }
      );
      console.log(
        '커뮤니티 글 작성 전체 응답',
        response
      );
      return response.data;
    } catch (error) {
      console.error(
        '게시글 작성 중 오류 발생:',
        error.response || error
      );
      throw error;
    }
  },

  // 게시글 좋아요
  async likePost(postId, userId) {
    const response = await api.post(
      `${BASE_URL}/${postId}/like`,
      { userId }
    );

    // 서버에서 갱신된 postLikeHits 값을 응답으로 받는다고 가정
    console.log('COMMUNITY POST LIKE', response);
    return response.data; // 좋아요 처리 후 변경된 데이터 반환
  },

  // 게시글 수정
  async update(postId, post) {
    const formData = new FormData();
    for (const key in post) {
      if (
        post[key] !== null &&
        post[key] !== undefined
      ) {
        formData.append(key, post[key]);
      } else {
        console.log(
          `${key} is null or undefined`
        ); //디버깅 전용 로그
      }
    }
    const response = await api.post(
      `${BASE_URL}/${postId}/update`,
      formData,
      {
        headers,
      }
    );
    console.log(
      'COMMUNITY POST UPDATE',
      response
    );
    return response.data;
  },

  // 게시글 삭제
  async delete(postId) {
    const response = await api.delete(
      `${BASE_URL}/${postId}/delete`
    );
    console.log('COMMUNITY DELETE', response);
    return response.data;
  },
};
