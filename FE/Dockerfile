# -----------------------------
# GIAI ĐOẠN 1: BUILD ỨNG DỤNG REACT
# -----------------------------
FROM node:20-alpine AS build

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép các tệp package để cache layer cài đặt
COPY package*.json ./

# Cài dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Copy env file build-time (Render sẽ inject tự động nếu có)
COPY .env.production .env

# (Tuỳ chọn) Thiết lập NODE_ENV để CRA hiểu là build production
ENV NODE_ENV=production

# Build ra thư mục /app/build
RUN npm run build

# -----------------------------
# GIAI ĐOẠN 2: PHỤC VỤ (Nginx)
# -----------------------------
FROM nginx:alpine

# Xóa cấu hình mặc định của Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Thêm file cấu hình React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy kết quả build từ stage 1 sang Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

# Chạy nginx
CMD ["nginx", "-g", "daemon off;"]
