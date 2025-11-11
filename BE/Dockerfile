# Dockerfile Tối ưu hóa cho Render (Chỉ dùng Express.js)

FROM node:20-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json ./ 
RUN npm install

# Sao chép mã nguồn còn lại
COPY . .

# Ứng dụng sẽ lắng nghe trên cổng 10000 (hoặc cổng được Render cung cấp qua biến $PORT)
# Đảm bảo code Express của bạn đọc biến môi trường PORT
EXPOSE 10000 

CMD ["npm", "start"]