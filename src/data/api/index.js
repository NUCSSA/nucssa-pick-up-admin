let apiEndPoint

if (process.env.NODE_ENV === 'production') {
  apiEndPoint = process.env.API_END_POINT
} else {
  apiEndPoint = 'http://localhost:3000'
}

export const API_END_POINT = apiEndPoint