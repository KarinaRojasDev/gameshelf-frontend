import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true
});

const request = async (callback) => {
  try {
    const response = await callback()
    return response.data
  } catch (error) {
    const message = error.response?.data?.message || 'Ha ocurrido un error con la API'
    throw new Error(message, { cause: error })
  }
}

// Auth
export const registerUser = (payload) => request(() => api.post('/auth/register', payload))
export const loginUser = (payload) => request(() => api.post('/auth/login', payload))
export const logoutUser = () => request(() => api.post('/auth/logout'))
export const getMe = () => request(() => api.get('/auth/me'))

// Users
export const getUserById = (id) => request(() => api.get(`/users/${id}`))
export const updateUser = (id, payload) => request(() => api.put(`/users/${id}`, payload))

// Games
export const getRandomGames = () => request(() => api.get('/games'))
export const searchGames = (query) => request(() => api.get(`/games/search?query=${query}`))
export const getGameById = (id) => request(() => api.get(`/games/${id}`))

// GameList
export const addGameToList = (payload) => request(() => api.post('/gamelist', payload))
export const getUserList = (userId) => request(() => api.get(`/gamelist/${userId}`))
export const removeGameFromList = (rawgId) => request(() => api.delete(`/gamelist/${rawgId}`))

// Reviews
export const createReview = (payload) => request(() => api.post('/reviews', payload))
export const getGameReviews = (rawgId) => request(() => api.get(`/reviews/game/${rawgId}`))
export const getUserReviews = (userId) => request(() => api.get(`/reviews/user/${userId}`))
export const updateReview = (id, payload) => request(() => api.put(`/reviews/${id}`, payload))
export const deleteReview = (id) => request(() => api.delete(`/reviews/${id}`))

// Likes
export const addLike = (payload) => request(() => api.post('/likes', payload))
export const removeLike = (reviewId) => request(() => api.delete(`/likes/${reviewId}`))
export const getReviewLikes = (reviewId) => request(() => api.get(`/likes/${reviewId}`))

export default api;