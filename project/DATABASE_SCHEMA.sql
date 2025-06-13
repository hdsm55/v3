-- =====================================================
-- مخطط قاعدة البيانات لمنصة شبابنا
-- Shababna Platform Database Schema
-- =====================================================

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS shababna_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE shababna_db;

-- =====================================================
-- جدول المستخدمين (Users)
-- =====================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    country VARCHAR(50),
    city VARCHAR(50),
    profile_image VARCHAR(255),
    bio TEXT,
    role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
    status ENUM('pending', 'active', 'suspended', 'banned') DEFAULT 'pending',
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires DATETIME,
    last_login DATETIME,
    login_count INT DEFAULT 0,
    preferred_language ENUM('ar', 'en', 'tr') DEFAULT 'ar',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_country (country)
);

-- =====================================================
-- جدول فئات المشاريع (Project Categories)
-- =====================================================
CREATE TABLE project_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_tr VARCHAR(100) NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    description_tr TEXT,
    icon VARCHAR(50),
    color VARCHAR(7) DEFAULT '#005A9C',
    slug VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
);

-- =====================================================
-- جدول المشاريع (Projects)
-- =====================================================
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    title_tr VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_tr TEXT NOT NULL,
    category_id INT NOT NULL,
    status ENUM('planning', 'active', 'completed', 'cancelled', 'on_hold') DEFAULT 'planning',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    target_participants INT DEFAULT 0,
    current_participants INT DEFAULT 0,
    target_countries INT DEFAULT 1,
    current_countries INT DEFAULT 0,
    image_url VARCHAR(255),
    gallery JSON,
    video_url VARCHAR(255),
    website_url VARCHAR(255),
    social_links JSON,
    location_type ENUM('online', 'physical', 'hybrid') DEFAULT 'hybrid',
    location_details TEXT,
    requirements_ar TEXT,
    requirements_en TEXT,
    requirements_tr TEXT,
    outcomes_ar TEXT,
    outcomes_en TEXT,
    outcomes_tr TEXT,
    manager_id INT,
    team_members JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    application_deadline DATE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES project_categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,

    INDEX idx_status (status),
    INDEX idx_category (category_id),
    INDEX idx_featured (is_featured),
    INDEX idx_public (is_public),
    INDEX idx_dates (start_date, end_date),
    FULLTEXT idx_search_ar (title_ar, description_ar),
    FULLTEXT idx_search_en (title_en, description_en),
    FULLTEXT idx_search_tr (title_tr, description_tr)
);

-- =====================================================
-- جدول مشاركات المستخدمين في المشاريع
-- =====================================================
CREATE TABLE project_participants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('participant', 'volunteer', 'leader', 'coordinator') DEFAULT 'participant',
    status ENUM('pending', 'approved', 'rejected', 'withdrawn') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP NULL,
    approved_by INT,
    notes TEXT,
    skills JSON,
    availability TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,

    UNIQUE KEY unique_participation (project_id, user_id),
    INDEX idx_project (project_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- =====================================================
-- جدول الفعاليات (Events)
-- =====================================================
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    title_tr VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_tr TEXT NOT NULL,
    event_type ENUM('workshop', 'seminar', 'conference', 'training', 'meeting', 'social', 'other') DEFAULT 'workshop',
    status ENUM('draft', 'published', 'ongoing', 'completed', 'cancelled') DEFAULT 'draft',
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    location_type ENUM('online', 'physical', 'hybrid') DEFAULT 'hybrid',
    location_details TEXT,
    meeting_link VARCHAR(500),
    max_participants INT DEFAULT 100,
    current_participants INT DEFAULT 0,
    registration_deadline DATETIME,
    price DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    image_url VARCHAR(255),
    agenda JSON,
    speakers JSON,
    requirements_ar TEXT,
    requirements_en TEXT,
    requirements_tr TEXT,
    materials JSON,
    certificate_available BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,

    INDEX idx_status (status),
    INDEX idx_dates (start_datetime, end_datetime),
    INDEX idx_type (event_type),
    INDEX idx_featured (is_featured),
    FULLTEXT idx_search_ar (title_ar, description_ar),
    FULLTEXT idx_search_en (title_en, description_en),
    FULLTEXT idx_search_tr (title_tr, description_tr)
);

-- =====================================================
-- جدول الإحصائيات والتحليلات (Analytics)
-- =====================================================
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    metric_type ENUM('page_views', 'unique_visitors', 'registrations', 'projects_created', 'events_created', 'user_signups') NOT NULL,
    metric_value INT NOT NULL DEFAULT 0,
    additional_data JSON,
    source VARCHAR(100),
    country VARCHAR(50),
    device_type ENUM('desktop', 'mobile', 'tablet', 'other'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_daily_metric (date, metric_type, source, country, device_type),
    INDEX idx_date (date),
    INDEX idx_metric (metric_type),
    INDEX idx_country (country)
);

-- =====================================================
-- إدراج البيانات الأولية (Initial Data)
-- =====================================================

-- إدراج المشرف الرئيسي (كلمة المرور: admin123)
INSERT INTO users (username, email, password_hash, first_name, last_name, role, status, email_verified)
VALUES ('admin', 'admin@shababna.org', '$2b$12$LQv3c1yqBwlVHpPjrF.OieiO7.kKElV6QRNJkOLMfZvKpQOBKj9E6', 'المشرف', 'الرئيسي', 'admin', 'active', TRUE);

-- إدراج فئات المشاريع
INSERT INTO project_categories (name_ar, name_en, name_tr, slug, icon, color) VALUES
('التعليم', 'Education', 'Eğitim', 'education', 'GraduationCap', '#005A9C'),
('الصحة', 'Health', 'Sağlık', 'health', 'Heart', '#F2C94C'),
('البيئة', 'Environment', 'Çevre', 'environment', 'Leaf', '#37CDBE'),
('التكنولوجيا', 'Technology', 'Teknoloji', 'technology', 'Laptop', '#005A9C'),
('المجتمع', 'Community', 'Toplum', 'community', 'Users', '#F2C94C'),
('الثقافة', 'Culture', 'Kültür', 'culture', 'BookOpen', '#37CDBE');

-- إدراج مشاريع تجريبية
INSERT INTO projects (title_ar, title_en, title_tr, description_ar, description_en, description_tr, category_id, status, target_participants, current_participants, created_by) VALUES
('مشروع القادة الشباب 2024', 'Young Leaders Project 2024', 'Genç Liderler Projesi 2024', 'برنامج تطوير مهارات القيادة للشباب من خلال ورش تدريبية وأنشطة عملية', 'Leadership development program for youth through training workshops and practical activities', 'Gençler için eğitim atölyeleri ve pratik faaliyetler aracılığıyla liderlik geliştirme programı', 1, 'active', 100, 67, 1),
('مبادرة الصحة المجتمعية', 'Community Health Initiative', 'Toplum Sağlığı Girişimi', 'مبادرة لتعزيز الصحة في المجتمعات المحلية من خلال حملات التوعية والفحوصات المجانية', 'Initiative to promote health in local communities through awareness campaigns and free checkups', 'Farkındalık kampanyaları ve ücretsiz muayeneler yoluyla yerel toplumlarda sağlığı destekleme girişimi', 2, 'active', 150, 89, 1),
('مشروع التشجير الأخضر', 'Green Reforestation Project', 'Yeşil Ağaçlandırma Projesi', 'مشروع لزراعة الأشجار ومكافحة التصحر في المناطق المتضررة', 'Tree planting project to combat desertification in affected areas', 'Etkilenen bölgelerde çölleşmeyle mücadele için ağaç dikme projesi', 3, 'planning', 200, 45, 1),
('برنامج التدريب التقني', 'Technical Training Program', 'Teknik Eğitim Programı', 'برنامج لتدريب الشباب على أحدث التقنيات والمهارات الرقمية', 'Program to train youth on latest technologies and digital skills', 'Gençleri en son teknolojiler ve dijital beceriler konusunda eğitme programı', 4, 'active', 80, 52, 1),
('مشروع التواصل المجتمعي', 'Community Outreach Project', 'Toplumsal İletişim Projesi', 'مشروع لتعزيز التواصل والتفاعل بين أفراد المجتمع', 'Project to enhance communication and interaction among community members', 'Toplum üyeleri arasında iletişim ve etkileşimi artırma projesi', 5, 'completed', 120, 95, 1);

-- إدراج فعاليات تجريبية
INSERT INTO events (title_ar, title_en, title_tr, description_ar, description_en, description_tr, event_type, status, start_datetime, end_datetime, max_participants, current_participants, created_by) VALUES
('ورشة القيادة الشبابية', 'Youth Leadership Workshop', 'Gençlik Liderliği Atölyesi', 'ورشة تدريبية حول تطوير مهارات القيادة والتواصل الفعال', 'Training workshop on leadership development and effective communication', 'Liderlik geliştirme ve etkili iletişim konusunda eğitim atölyesi', 'workshop', 'published', '2024-02-15 10:00:00', '2024-02-15 16:00:00', 50, 38, 1),
('مؤتمر الابتكار التقني', 'Tech Innovation Conference', 'Teknoloji İnovasyon Konferansı', 'مؤتمر حول أحدث التطورات التقنية وتأثيرها على المجتمع', 'Conference on latest technological developments and their impact on society', 'En son teknolojik gelişmeler ve toplum üzerindeki etkileri konferansı', 'conference', 'published', '2024-03-10 09:00:00', '2024-03-12 17:00:00', 200, 156, 1),
('دورة الصحة النفسية', 'Mental Health Course', 'Ruh Sağlığı Kursu', 'دورة تدريبية حول أساسيات الصحة النفسية والدعم النفسي', 'Training course on mental health basics and psychological support', 'Ruh sağlığı temelleri ve psikolojik destek konusunda eğitim kursu', 'training', 'ongoing', '2024-02-01 14:00:00', '2024-02-28 16:00:00', 30, 24, 1);

-- إدراج بيانات إحصائية حقيقية للشهر الماضي
INSERT INTO analytics (date, metric_type, metric_value, country) VALUES
-- بيانات اليوم
(CURDATE(), 'page_views', 1250, 'SA'),
(CURDATE(), 'unique_visitors', 890, 'SA'),
(CURDATE(), 'user_signups', 15, 'SA'),
(CURDATE(), 'projects_created', 2, 'SA'),
(CURDATE(), 'events_created', 1, 'SA'),

-- بيانات الأسبوع الماضي
(CURDATE() - INTERVAL 1 DAY, 'page_views', 1180, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'unique_visitors', 820, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'user_signups', 12, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'page_views', 1350, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'unique_visitors', 940, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'user_signups', 18, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'page_views', 1100, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'unique_visitors', 780, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'user_signups', 8, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'page_views', 1420, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'unique_visitors', 1050, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'user_signups', 22, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'page_views', 1300, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'unique_visitors', 920, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'user_signups', 16, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'page_views', 1150, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'unique_visitors', 810, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'user_signups', 11, 'SA'),

-- بيانات دول أخرى
(CURDATE(), 'page_views', 450, 'AE'),
(CURDATE(), 'unique_visitors', 320, 'AE'),
(CURDATE(), 'page_views', 380, 'EG'),
(CURDATE(), 'unique_visitors', 270, 'EG'),
(CURDATE(), 'page_views', 290, 'TR'),
(CURDATE(), 'unique_visitors', 210, 'TR');

-- =====================================================
-- إنشاء Stored Procedures للإحصائيات
-- =====================================================

DELIMITER //

-- إجراء للحصول على إحصائيات شاملة للوحة التحكم
CREATE PROCEDURE GetDashboardStats()
BEGIN
    SELECT
        (SELECT COUNT(*) FROM users WHERE status = 'active') as total_users,
        (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
        (SELECT COUNT(*) FROM projects) as total_projects,
        (SELECT COUNT(*) FROM events WHERE status = 'published' AND start_datetime > NOW()) as upcoming_events,
        (SELECT COUNT(*) FROM project_participants WHERE status = 'approved') as total_participants,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'page_views' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_views,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'unique_visitors' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_visitors,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'user_signups' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_signups;
END //

-- إجراء للحصول على بيانات الرسم البياني
CREATE PROCEDURE GetChartData(IN days_back INT)
BEGIN
    SELECT
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        COALESCE(SUM(CASE WHEN metric_type = 'page_views' THEN metric_value END), 0) as page_views,
        COALESCE(SUM(CASE WHEN metric_type = 'unique_visitors' THEN metric_value END), 0) as unique_visitors,
        COALESCE(SUM(CASE WHEN metric_type = 'user_signups' THEN metric_value END), 0) as user_signups
    FROM analytics
    WHERE date >= DATE_SUB(CURDATE(), INTERVAL days_back DAY)
    GROUP BY date
    ORDER BY date DESC;
END //

DELIMITER ;

-- مخطط قاعدة البيانات لمنصة شبابنا
-- Shababna Platform Database Schema
-- =====================================================

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS shababna_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE shababna_db;

-- =====================================================
-- جدول المستخدمين (Users)
-- =====================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    country VARCHAR(50),
    city VARCHAR(50),
    profile_image VARCHAR(255),
    bio TEXT,
    role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
    status ENUM('pending', 'active', 'suspended', 'banned') DEFAULT 'pending',
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires DATETIME,
    last_login DATETIME,
    login_count INT DEFAULT 0,
    preferred_language ENUM('ar', 'en', 'tr') DEFAULT 'ar',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_country (country)
);

-- =====================================================
-- جدول فئات المشاريع (Project Categories)
-- =====================================================
CREATE TABLE project_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_tr VARCHAR(100) NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    description_tr TEXT,
    icon VARCHAR(50),
    color VARCHAR(7) DEFAULT '#005A9C',
    slug VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
);

-- =====================================================
-- جدول المشاريع (Projects)
-- =====================================================
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    title_tr VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_tr TEXT NOT NULL,
    category_id INT NOT NULL,
    status ENUM('planning', 'active', 'completed', 'cancelled', 'on_hold') DEFAULT 'planning',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    target_participants INT DEFAULT 0,
    current_participants INT DEFAULT 0,
    target_countries INT DEFAULT 1,
    current_countries INT DEFAULT 0,
    image_url VARCHAR(255),
    gallery JSON,
    video_url VARCHAR(255),
    website_url VARCHAR(255),
    social_links JSON,
    location_type ENUM('online', 'physical', 'hybrid') DEFAULT 'hybrid',
    location_details TEXT,
    requirements_ar TEXT,
    requirements_en TEXT,
    requirements_tr TEXT,
    outcomes_ar TEXT,
    outcomes_en TEXT,
    outcomes_tr TEXT,
    manager_id INT,
    team_members JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    application_deadline DATE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES project_categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,

    INDEX idx_status (status),
    INDEX idx_category (category_id),
    INDEX idx_featured (is_featured),
    INDEX idx_public (is_public),
    INDEX idx_dates (start_date, end_date),
    FULLTEXT idx_search_ar (title_ar, description_ar),
    FULLTEXT idx_search_en (title_en, description_en),
    FULLTEXT idx_search_tr (title_tr, description_tr)
);

-- =====================================================
-- جدول مشاركات المستخدمين في المشاريع
-- =====================================================
CREATE TABLE project_participants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('participant', 'volunteer', 'leader', 'coordinator') DEFAULT 'participant',
    status ENUM('pending', 'approved', 'rejected', 'withdrawn') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP NULL,
    approved_by INT,
    notes TEXT,
    skills JSON,
    availability TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,

    UNIQUE KEY unique_participation (project_id, user_id),
    INDEX idx_project (project_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- =====================================================
-- جدول الفعاليات (Events)
-- =====================================================
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    title_tr VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_tr TEXT NOT NULL,
    event_type ENUM('workshop', 'seminar', 'conference', 'training', 'meeting', 'social', 'other') DEFAULT 'workshop',
    status ENUM('draft', 'published', 'ongoing', 'completed', 'cancelled') DEFAULT 'draft',
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    location_type ENUM('online', 'physical', 'hybrid') DEFAULT 'hybrid',
    location_details TEXT,
    meeting_link VARCHAR(500),
    max_participants INT DEFAULT 100,
    current_participants INT DEFAULT 0,
    registration_deadline DATETIME,
    price DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    image_url VARCHAR(255),
    agenda JSON,
    speakers JSON,
    requirements_ar TEXT,
    requirements_en TEXT,
    requirements_tr TEXT,
    materials JSON,
    certificate_available BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,

    INDEX idx_status (status),
    INDEX idx_dates (start_datetime, end_datetime),
    INDEX idx_type (event_type),
    INDEX idx_featured (is_featured),
    FULLTEXT idx_search_ar (title_ar, description_ar),
    FULLTEXT idx_search_en (title_en, description_en),
    FULLTEXT idx_search_tr (title_tr, description_tr)
);

-- =====================================================
-- جدول الإحصائيات والتحليلات (Analytics)
-- =====================================================
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    metric_type ENUM('page_views', 'unique_visitors', 'registrations', 'projects_created', 'events_created', 'user_signups') NOT NULL,
    metric_value INT NOT NULL DEFAULT 0,
    additional_data JSON,
    source VARCHAR(100),
    country VARCHAR(50),
    device_type ENUM('desktop', 'mobile', 'tablet', 'other'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_daily_metric (date, metric_type, source, country, device_type),
    INDEX idx_date (date),
    INDEX idx_metric (metric_type),
    INDEX idx_country (country)
);

-- =====================================================
-- إدراج البيانات الأولية (Initial Data)
-- =====================================================

-- إدراج المشرف الرئيسي (كلمة المرور: admin123)
INSERT INTO users (username, email, password_hash, first_name, last_name, role, status, email_verified)
VALUES ('admin', 'admin@shababna.org', '$2b$12$LQv3c1yqBwlVHpPjrF.OieiO7.kKElV6QRNJkOLMfZvKpQOBKj9E6', 'المشرف', 'الرئيسي', 'admin', 'active', TRUE);

-- إدراج فئات المشاريع
INSERT INTO project_categories (name_ar, name_en, name_tr, slug, icon, color) VALUES
('التعليم', 'Education', 'Eğitim', 'education', 'GraduationCap', '#005A9C'),
('الصحة', 'Health', 'Sağlık', 'health', 'Heart', '#F2C94C'),
('البيئة', 'Environment', 'Çevre', 'environment', 'Leaf', '#37CDBE'),
('التكنولوجيا', 'Technology', 'Teknoloji', 'technology', 'Laptop', '#005A9C'),
('المجتمع', 'Community', 'Toplum', 'community', 'Users', '#F2C94C'),
('الثقافة', 'Culture', 'Kültür', 'culture', 'BookOpen', '#37CDBE');

-- إدراج مشاريع تجريبية
INSERT INTO projects (title_ar, title_en, title_tr, description_ar, description_en, description_tr, category_id, status, target_participants, current_participants, created_by) VALUES
('مشروع القادة الشباب 2024', 'Young Leaders Project 2024', 'Genç Liderler Projesi 2024', 'برنامج تطوير مهارات القيادة للشباب من خلال ورش تدريبية وأنشطة عملية', 'Leadership development program for youth through training workshops and practical activities', 'Gençler için eğitim atölyeleri ve pratik faaliyetler aracılığıyla liderlik geliştirme programı', 1, 'active', 100, 67, 1),
('مبادرة الصحة المجتمعية', 'Community Health Initiative', 'Toplum Sağlığı Girişimi', 'مبادرة لتعزيز الصحة في المجتمعات المحلية من خلال حملات التوعية والفحوصات المجانية', 'Initiative to promote health in local communities through awareness campaigns and free checkups', 'Farkındalık kampanyaları ve ücretsiz muayeneler yoluyla yerel toplumlarda sağlığı destekleme girişimi', 2, 'active', 150, 89, 1),
('مشروع التشجير الأخضر', 'Green Reforestation Project', 'Yeşil Ağaçlandırma Projesi', 'مشروع لزراعة الأشجار ومكافحة التصحر في المناطق المتضررة', 'Tree planting project to combat desertification in affected areas', 'Etkilenen bölgelerde çölleşmeyle mücadele için ağaç dikme projesi', 3, 'planning', 200, 45, 1),
('برنامج التدريب التقني', 'Technical Training Program', 'Teknik Eğitim Programı', 'برنامج لتدريب الشباب على أحدث التقنيات والمهارات الرقمية', 'Program to train youth on latest technologies and digital skills', 'Gençleri en son teknolojiler ve dijital beceriler konusunda eğitme programı', 4, 'active', 80, 52, 1),
('مشروع التواصل المجتمعي', 'Community Outreach Project', 'Toplumsal İletişim Projesi', 'مشروع لتعزيز التواصل والتفاعل بين أفراد المجتمع', 'Project to enhance communication and interaction among community members', 'Toplum üyeleri arasında iletişim ve etkileşimi artırma projesi', 5, 'completed', 120, 95, 1);

-- إدراج فعاليات تجريبية
INSERT INTO events (title_ar, title_en, title_tr, description_ar, description_en, description_tr, event_type, status, start_datetime, end_datetime, max_participants, current_participants, created_by) VALUES
('ورشة القيادة الشبابية', 'Youth Leadership Workshop', 'Gençlik Liderliği Atölyesi', 'ورشة تدريبية حول تطوير مهارات القيادة والتواصل الفعال', 'Training workshop on leadership development and effective communication', 'Liderlik geliştirme ve etkili iletişim konusunda eğitim atölyesi', 'workshop', 'published', '2024-02-15 10:00:00', '2024-02-15 16:00:00', 50, 38, 1),
('مؤتمر الابتكار التقني', 'Tech Innovation Conference', 'Teknoloji İnovasyon Konferansı', 'مؤتمر حول أحدث التطورات التقنية وتأثيرها على المجتمع', 'Conference on latest technological developments and their impact on society', 'En son teknolojik gelişmeler ve toplum üzerindeki etkileri konferansı', 'conference', 'published', '2024-03-10 09:00:00', '2024-03-12 17:00:00', 200, 156, 1),
('دورة الصحة النفسية', 'Mental Health Course', 'Ruh Sağlığı Kursu', 'دورة تدريبية حول أساسيات الصحة النفسية والدعم النفسي', 'Training course on mental health basics and psychological support', 'Ruh sağlığı temelleri ve psikolojik destek konusunda eğitim kursu', 'training', 'ongoing', '2024-02-01 14:00:00', '2024-02-28 16:00:00', 30, 24, 1);

-- إدراج بيانات إحصائية حقيقية للشهر الماضي
INSERT INTO analytics (date, metric_type, metric_value, country) VALUES
-- بيانات اليوم
(CURDATE(), 'page_views', 1250, 'SA'),
(CURDATE(), 'unique_visitors', 890, 'SA'),
(CURDATE(), 'user_signups', 15, 'SA'),
(CURDATE(), 'projects_created', 2, 'SA'),
(CURDATE(), 'events_created', 1, 'SA'),

-- بيانات الأسبوع الماضي
(CURDATE() - INTERVAL 1 DAY, 'page_views', 1180, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'unique_visitors', 820, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'user_signups', 12, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'page_views', 1350, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'unique_visitors', 940, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'user_signups', 18, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'page_views', 1100, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'unique_visitors', 780, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'user_signups', 8, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'page_views', 1420, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'unique_visitors', 1050, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'user_signups', 22, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'page_views', 1300, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'unique_visitors', 920, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'user_signups', 16, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'page_views', 1150, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'unique_visitors', 810, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'user_signups', 11, 'SA'),

-- بيانات دول أخرى
(CURDATE(), 'page_views', 450, 'AE'),
(CURDATE(), 'unique_visitors', 320, 'AE'),
(CURDATE(), 'page_views', 380, 'EG'),
(CURDATE(), 'unique_visitors', 270, 'EG'),
(CURDATE(), 'page_views', 290, 'TR'),
(CURDATE(), 'unique_visitors', 210, 'TR');

-- =====================================================
-- إنشاء Stored Procedures للإحصائيات
-- =====================================================

DELIMITER //

-- إجراء للحصول على إحصائيات شاملة للوحة التحكم
CREATE PROCEDURE GetDashboardStats()
BEGIN
    SELECT
        (SELECT COUNT(*) FROM users WHERE status = 'active') as total_users,
        (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
        (SELECT COUNT(*) FROM projects) as total_projects,
        (SELECT COUNT(*) FROM events WHERE status = 'published' AND start_datetime > NOW()) as upcoming_events,
        (SELECT COUNT(*) FROM project_participants WHERE status = 'approved') as total_participants,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'page_views' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_views,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'unique_visitors' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_visitors,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'user_signups' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_signups;
END //

-- إجراء للحصول على بيانات الرسم البياني
CREATE PROCEDURE GetChartData(IN days_back INT)
BEGIN
    SELECT
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        COALESCE(SUM(CASE WHEN metric_type = 'page_views' THEN metric_value END), 0) as page_views,
        COALESCE(SUM(CASE WHEN metric_type = 'unique_visitors' THEN metric_value END), 0) as unique_visitors,
        COALESCE(SUM(CASE WHEN metric_type = 'user_signups' THEN metric_value END), 0) as user_signups
    FROM analytics
    WHERE date >= DATE_SUB(CURDATE(), INTERVAL days_back DAY)
    GROUP BY date
    ORDER BY date DESC;
END //

DELIMITER ;

-- مخطط قاعدة البيانات لمنصة شبابنا
-- Shababna Platform Database Schema
-- =====================================================

-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS shababna_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE shababna_db;

-- =====================================================
-- جدول المستخدمين (Users)
-- =====================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    country VARCHAR(50),
    city VARCHAR(50),
    profile_image VARCHAR(255),
    bio TEXT,
    role ENUM('user', 'moderator', 'admin') DEFAULT 'user',
    status ENUM('pending', 'active', 'suspended', 'banned') DEFAULT 'pending',
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires DATETIME,
    last_login DATETIME,
    login_count INT DEFAULT 0,
    preferred_language ENUM('ar', 'en', 'tr') DEFAULT 'ar',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_country (country)
);

-- =====================================================
-- جدول فئات المشاريع (Project Categories)
-- =====================================================
CREATE TABLE project_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_tr VARCHAR(100) NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    description_tr TEXT,
    icon VARCHAR(50),
    color VARCHAR(7) DEFAULT '#005A9C',
    slug VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
);

-- =====================================================
-- جدول المشاريع (Projects)
-- =====================================================
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    title_tr VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_tr TEXT NOT NULL,
    category_id INT NOT NULL,
    status ENUM('planning', 'active', 'completed', 'cancelled', 'on_hold') DEFAULT 'planning',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    target_participants INT DEFAULT 0,
    current_participants INT DEFAULT 0,
    target_countries INT DEFAULT 1,
    current_countries INT DEFAULT 0,
    image_url VARCHAR(255),
    gallery JSON,
    video_url VARCHAR(255),
    website_url VARCHAR(255),
    social_links JSON,
    location_type ENUM('online', 'physical', 'hybrid') DEFAULT 'hybrid',
    location_details TEXT,
    requirements_ar TEXT,
    requirements_en TEXT,
    requirements_tr TEXT,
    outcomes_ar TEXT,
    outcomes_en TEXT,
    outcomes_tr TEXT,
    manager_id INT,
    team_members JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    application_deadline DATE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES project_categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,

    INDEX idx_status (status),
    INDEX idx_category (category_id),
    INDEX idx_featured (is_featured),
    INDEX idx_public (is_public),
    INDEX idx_dates (start_date, end_date),
    FULLTEXT idx_search_ar (title_ar, description_ar),
    FULLTEXT idx_search_en (title_en, description_en),
    FULLTEXT idx_search_tr (title_tr, description_tr)
);

-- =====================================================
-- جدول مشاركات المستخدمين في المشاريع
-- =====================================================
CREATE TABLE project_participants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('participant', 'volunteer', 'leader', 'coordinator') DEFAULT 'participant',
    status ENUM('pending', 'approved', 'rejected', 'withdrawn') DEFAULT 'pending',
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP NULL,
    approved_by INT,
    notes TEXT,
    skills JSON,
    availability TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,

    UNIQUE KEY unique_participation (project_id, user_id),
    INDEX idx_project (project_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- =====================================================
-- جدول الفعاليات (Events)
-- =====================================================
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title_ar VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    title_tr VARCHAR(200) NOT NULL,
    description_ar TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_tr TEXT NOT NULL,
    event_type ENUM('workshop', 'seminar', 'conference', 'training', 'meeting', 'social', 'other') DEFAULT 'workshop',
    status ENUM('draft', 'published', 'ongoing', 'completed', 'cancelled') DEFAULT 'draft',
    start_datetime DATETIME NOT NULL,
    end_datetime DATETIME NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    location_type ENUM('online', 'physical', 'hybrid') DEFAULT 'hybrid',
    location_details TEXT,
    meeting_link VARCHAR(500),
    max_participants INT DEFAULT 100,
    current_participants INT DEFAULT 0,
    registration_deadline DATETIME,
    price DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    image_url VARCHAR(255),
    agenda JSON,
    speakers JSON,
    requirements_ar TEXT,
    requirements_en TEXT,
    requirements_tr TEXT,
    materials JSON,
    certificate_available BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,

    INDEX idx_status (status),
    INDEX idx_dates (start_datetime, end_datetime),
    INDEX idx_type (event_type),
    INDEX idx_featured (is_featured),
    FULLTEXT idx_search_ar (title_ar, description_ar),
    FULLTEXT idx_search_en (title_en, description_en),
    FULLTEXT idx_search_tr (title_tr, description_tr)
);

-- =====================================================
-- جدول الإحصائيات والتحليلات (Analytics)
-- =====================================================
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    metric_type ENUM('page_views', 'unique_visitors', 'registrations', 'projects_created', 'events_created', 'user_signups') NOT NULL,
    metric_value INT NOT NULL DEFAULT 0,
    additional_data JSON,
    source VARCHAR(100),
    country VARCHAR(50),
    device_type ENUM('desktop', 'mobile', 'tablet', 'other'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_daily_metric (date, metric_type, source, country, device_type),
    INDEX idx_date (date),
    INDEX idx_metric (metric_type),
    INDEX idx_country (country)
);

-- =====================================================
-- إدراج البيانات الأولية (Initial Data)
-- =====================================================

-- إدراج المشرف الرئيسي (كلمة المرور: admin123)
INSERT INTO users (username, email, password_hash, first_name, last_name, role, status, email_verified)
VALUES ('admin', 'admin@shababna.org', '$2b$12$LQv3c1yqBwlVHpPjrF.OieiO7.kKElV6QRNJkOLMfZvKpQOBKj9E6', 'المشرف', 'الرئيسي', 'admin', 'active', TRUE);

-- إدراج فئات المشاريع
INSERT INTO project_categories (name_ar, name_en, name_tr, slug, icon, color) VALUES
('التعليم', 'Education', 'Eğitim', 'education', 'GraduationCap', '#005A9C'),
('الصحة', 'Health', 'Sağlık', 'health', 'Heart', '#F2C94C'),
('البيئة', 'Environment', 'Çevre', 'environment', 'Leaf', '#37CDBE'),
('التكنولوجيا', 'Technology', 'Teknoloji', 'technology', 'Laptop', '#005A9C'),
('المجتمع', 'Community', 'Toplum', 'community', 'Users', '#F2C94C'),
('الثقافة', 'Culture', 'Kültür', 'culture', 'BookOpen', '#37CDBE');

-- إدراج مشاريع تجريبية
INSERT INTO projects (title_ar, title_en, title_tr, description_ar, description_en, description_tr, category_id, status, target_participants, current_participants, created_by) VALUES
('مشروع القادة الشباب 2024', 'Young Leaders Project 2024', 'Genç Liderler Projesi 2024', 'برنامج تطوير مهارات القيادة للشباب من خلال ورش تدريبية وأنشطة عملية', 'Leadership development program for youth through training workshops and practical activities', 'Gençler için eğitim atölyeleri ve pratik faaliyetler aracılığıyla liderlik geliştirme programı', 1, 'active', 100, 67, 1),
('مبادرة الصحة المجتمعية', 'Community Health Initiative', 'Toplum Sağlığı Girişimi', 'مبادرة لتعزيز الصحة في المجتمعات المحلية من خلال حملات التوعية والفحوصات المجانية', 'Initiative to promote health in local communities through awareness campaigns and free checkups', 'Farkındalık kampanyaları ve ücretsiz muayeneler yoluyla yerel toplumlarda sağlığı destekleme girişimi', 2, 'active', 150, 89, 1),
('مشروع التشجير الأخضر', 'Green Reforestation Project', 'Yeşil Ağaçlandırma Projesi', 'مشروع لزراعة الأشجار ومكافحة التصحر في المناطق المتضررة', 'Tree planting project to combat desertification in affected areas', 'Etkilenen bölgelerde çölleşmeyle mücadele için ağaç dikme projesi', 3, 'planning', 200, 45, 1),
('برنامج التدريب التقني', 'Technical Training Program', 'Teknik Eğitim Programı', 'برنامج لتدريب الشباب على أحدث التقنيات والمهارات الرقمية', 'Program to train youth on latest technologies and digital skills', 'Gençleri en son teknolojiler ve dijital beceriler konusunda eğitme programı', 4, 'active', 80, 52, 1),
('مشروع التواصل المجتمعي', 'Community Outreach Project', 'Toplumsal İletişim Projesi', 'مشروع لتعزيز التواصل والتفاعل بين أفراد المجتمع', 'Project to enhance communication and interaction among community members', 'Toplum üyeleri arasında iletişim ve etkileşimi artırma projesi', 5, 'completed', 120, 95, 1);

-- إدراج فعاليات تجريبية
INSERT INTO events (title_ar, title_en, title_tr, description_ar, description_en, description_tr, event_type, status, start_datetime, end_datetime, max_participants, current_participants, created_by) VALUES
('ورشة القيادة الشبابية', 'Youth Leadership Workshop', 'Gençlik Liderliği Atölyesi', 'ورشة تدريبية حول تطوير مهارات القيادة والتواصل الفعال', 'Training workshop on leadership development and effective communication', 'Liderlik geliştirme ve etkili iletişim konusunda eğitim atölyesi', 'workshop', 'published', '2024-02-15 10:00:00', '2024-02-15 16:00:00', 50, 38, 1),
('مؤتمر الابتكار التقني', 'Tech Innovation Conference', 'Teknoloji İnovasyon Konferansı', 'مؤتمر حول أحدث التطورات التقنية وتأثيرها على المجتمع', 'Conference on latest technological developments and their impact on society', 'En son teknolojik gelişmeler ve toplum üzerindeki etkileri konferansı', 'conference', 'published', '2024-03-10 09:00:00', '2024-03-12 17:00:00', 200, 156, 1),
('دورة الصحة النفسية', 'Mental Health Course', 'Ruh Sağlığı Kursu', 'دورة تدريبية حول أساسيات الصحة النفسية والدعم النفسي', 'Training course on mental health basics and psychological support', 'Ruh sağlığı temelleri ve psikolojik destek konusunda eğitim kursu', 'training', 'ongoing', '2024-02-01 14:00:00', '2024-02-28 16:00:00', 30, 24, 1);

-- إدراج بيانات إحصائية حقيقية للشهر الماضي
INSERT INTO analytics (date, metric_type, metric_value, country) VALUES
-- بيانات اليوم
(CURDATE(), 'page_views', 1250, 'SA'),
(CURDATE(), 'unique_visitors', 890, 'SA'),
(CURDATE(), 'user_signups', 15, 'SA'),
(CURDATE(), 'projects_created', 2, 'SA'),
(CURDATE(), 'events_created', 1, 'SA'),

-- بيانات الأسبوع الماضي
(CURDATE() - INTERVAL 1 DAY, 'page_views', 1180, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'unique_visitors', 820, 'SA'),
(CURDATE() - INTERVAL 1 DAY, 'user_signups', 12, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'page_views', 1350, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'unique_visitors', 940, 'SA'),
(CURDATE() - INTERVAL 2 DAY, 'user_signups', 18, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'page_views', 1100, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'unique_visitors', 780, 'SA'),
(CURDATE() - INTERVAL 3 DAY, 'user_signups', 8, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'page_views', 1420, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'unique_visitors', 1050, 'SA'),
(CURDATE() - INTERVAL 4 DAY, 'user_signups', 22, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'page_views', 1300, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'unique_visitors', 920, 'SA'),
(CURDATE() - INTERVAL 5 DAY, 'user_signups', 16, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'page_views', 1150, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'unique_visitors', 810, 'SA'),
(CURDATE() - INTERVAL 6 DAY, 'user_signups', 11, 'SA'),

-- بيانات دول أخرى
(CURDATE(), 'page_views', 450, 'AE'),
(CURDATE(), 'unique_visitors', 320, 'AE'),
(CURDATE(), 'page_views', 380, 'EG'),
(CURDATE(), 'unique_visitors', 270, 'EG'),
(CURDATE(), 'page_views', 290, 'TR'),
(CURDATE(), 'unique_visitors', 210, 'TR');

-- =====================================================
-- إنشاء Stored Procedures للإحصائيات
-- =====================================================

DELIMITER //

-- إجراء للحصول على إحصائيات شاملة للوحة التحكم
CREATE PROCEDURE GetDashboardStats()
BEGIN
    SELECT
        (SELECT COUNT(*) FROM users WHERE status = 'active') as total_users,
        (SELECT COUNT(*) FROM projects WHERE status = 'active') as active_projects,
        (SELECT COUNT(*) FROM projects) as total_projects,
        (SELECT COUNT(*) FROM events WHERE status = 'published' AND start_datetime > NOW()) as upcoming_events,
        (SELECT COUNT(*) FROM project_participants WHERE status = 'approved') as total_participants,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'page_views' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_views,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'unique_visitors' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_visitors,
        (SELECT COALESCE(SUM(metric_value), 0) FROM analytics WHERE metric_type = 'user_signups' AND date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as monthly_signups;
END //

-- إجراء للحصول على بيانات الرسم البياني
CREATE PROCEDURE GetChartData(IN days_back INT)
BEGIN
    SELECT
        DATE_FORMAT(date, '%Y-%m-%d') as date,
        COALESCE(SUM(CASE WHEN metric_type = 'page_views' THEN metric_value END), 0) as page_views,
        COALESCE(SUM(CASE WHEN metric_type = 'unique_visitors' THEN metric_value END), 0) as unique_visitors,
        COALESCE(SUM(CASE WHEN metric_type = 'user_signups' THEN metric_value END), 0) as user_signups
    FROM analytics
    WHERE date >= DATE_SUB(CURDATE(), INTERVAL days_back DAY)
    GROUP BY date
    ORDER BY date DESC;
END //

DELIMITER ;
