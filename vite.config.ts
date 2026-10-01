import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 💡 base 경로를 하위 디렉터리 이름으로 지정합니다.
  base: '/chatbot-front/',
})
