-- مخطط قاعدة البيانات لمنصة شبابنا
CREATE DATABASE IF NOT EXISTS shababna_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shababna_db;

-- جدول المستخدمين
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
    status ENUM('pending', 'active', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول المشاريع
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    status ENUM('planning', 'active', 'completed') DEFAULT 'active',
    target_participants INT DEFAULT 0,
    current_participants INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الإحصائيات
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    metric_value INT DEFAULT 0,
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج بيانات أولية
INSERT INTO users (username, email, password_hash, first_name, last_name, role, status)
VALUES ('admin', 'admin@shababna.org', '$2b$12$LQv3c1yqBwlVHpPjrF.OieiO7.kKElV6QRNJkOLMfZvKpQOBKj9E6', 'المشرف', 'الرئيسي', 'admin', 'active');

INSERT INTO projects (title_ar, title_en, description_ar, description_en, status, target_participants, current_participants) VALUES
('مشروع القادة الشباب 2024', 'Young Leaders Project 2024', 'برنامج تطوير مهارات القيادة للشباب', 'Leadership development program for youth', 'active', 100, 67),
('مبادرة الصحة المجتمعية', 'Community Health Initiative', 'مبادرة لتعزيز الصحة المجتمعية', 'Initiative to promote community health', 'active', 150, 89),
('مشروع التشجير الأخضر', 'Green Reforestation Project', 'مشروع لزراعة الأشجار', 'Tree planting project', 'planning', 200, 45);

INSERT INTO analytics (date, metric_type, metric_value, country) VALUES
(CURDATE(), 'page_views', 1250, 'SA'),
(CURDATE(), 'unique_visitors', 890, 'SA'),
(CURDATE(), 'user_signups', 15, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'page_views', 1180, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'unique_visitors', 820, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'user_signups', 12, 'SA');

CREATE DATABASE IF NOT EXISTS shababna_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shababna_db;

-- جدول المستخدمين
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
    status ENUM('pending', 'active', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول المشاريع
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    status ENUM('planning', 'active', 'completed') DEFAULT 'active',
    target_participants INT DEFAULT 0,
    current_participants INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الإحصائيات
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    metric_value INT DEFAULT 0,
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج بيانات أولية
INSERT INTO users (username, email, password_hash, first_name, last_name, role, status)
VALUES ('admin', 'admin@shababna.org', '$2b$12$LQv3c1yqBwlVHpPjrF.OieiO7.kKElV6QRNJkOLMfZvKpQOBKj9E6', 'المشرف', 'الرئيسي', 'admin', 'active');

INSERT INTO projects (title_ar, title_en, description_ar, description_en, status, target_participants, current_participants) VALUES
('مشروع القادة الشباب 2024', 'Young Leaders Project 2024', 'برنامج تطوير مهارات القيادة للشباب', 'Leadership development program for youth', 'active', 100, 67),
('مبادرة الصحة المجتمعية', 'Community Health Initiative', 'مبادرة لتعزيز الصحة المجتمعية', 'Initiative to promote community health', 'active', 150, 89),
('مشروع التشجير الأخضر', 'Green Reforestation Project', 'مشروع لزراعة الأشجار', 'Tree planting project', 'planning', 200, 45);

INSERT INTO analytics (date, metric_type, metric_value, country) VALUES
(CURDATE(), 'page_views', 1250, 'SA'),
(CURDATE(), 'unique_visitors', 890, 'SA'),
(CURDATE(), 'user_signups', 15, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'page_views', 1180, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'unique_visitors', 820, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'user_signups', 12, 'SA');

CREATE DATABASE IF NOT EXISTS shababna_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shababna_db;

-- جدول المستخدمين
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
    status ENUM('pending', 'active', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- جدول المشاريع
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    status ENUM('planning', 'active', 'completed') DEFAULT 'active',
    target_participants INT DEFAULT 0,
    current_participants INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الإحصائيات
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    metric_value INT DEFAULT 0,
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إدراج بيانات أولية
INSERT INTO users (username, email, password_hash, first_name, last_name, role, status)
VALUES ('admin', 'admin@shababna.org', '$2b$12$LQv3c1yqBwlVHpPjrF.OieiO7.kKElV6QRNJkOLMfZvKpQOBKj9E6', 'المشرف', 'الرئيسي', 'admin', 'active');

INSERT INTO projects (title_ar, title_en, description_ar, description_en, status, target_participants, current_participants) VALUES
('مشروع القادة الشباب 2024', 'Young Leaders Project 2024', 'برنامج تطوير مهارات القيادة للشباب', 'Leadership development program for youth', 'active', 100, 67),
('مبادرة الصحة المجتمعية', 'Community Health Initiative', 'مبادرة لتعزيز الصحة المجتمعية', 'Initiative to promote community health', 'active', 150, 89),
('مشروع التشجير الأخضر', 'Green Reforestation Project', 'مشروع لزراعة الأشجار', 'Tree planting project', 'planning', 200, 45);

INSERT INTO analytics (date, metric_type, metric_value, country) VALUES
(CURDATE(), 'page_views', 1250, 'SA'),
(CURDATE(), 'unique_visitors', 890, 'SA'),
(CURDATE(), 'user_signups', 15, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'page_views', 1180, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'unique_visitors', 820, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'user_signups', 12, 'SA');
