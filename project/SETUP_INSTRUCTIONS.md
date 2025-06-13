# 🚀 دليل إعداد مشروع شبابنا - لوحة التحكم

## ✅ المتطلبات الأساسية

### 1. البرامج المطلوبة:

- **Node.js** (الإصدار 18 أو أحدث)
- **MongoDB** (محلي أو MongoDB Atlas)
- **Git**

### 2. المتغيرات البيئية:

قم بإنشاء ملف `.env` في المجلد الرئيسي وأضف:

```env
# نسخ محتوى من env.example.txt
MONGODB_URI=mongodb://localhost:27017/shababna-db
JWT_SECRET=your-super-secret-jwt-key-here-make-it-complex
NODE_ENV=development
PORT=5000
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

## 📦 التثبيت والإعداد

### الخطوة 1: تثبيت الحزم

```bash
npm install
```

### الخطوة 2: إعداد قاعدة البيانات

```bash
# تشغيل MongoDB محلياً
mongod

# أو استخدم MongoDB Atlas (انسخ connection string)
```

### الخطوة 3: إنشاء مجلد الرفع

```bash
mkdir uploads
```

### الخطوة 4: تشغيل الخادم والواجهة

```bash
# تشغيل الخادم (في terminal منفصل)
npm run server

# تشغيل الواجهة الأمامية
npm run dev
```

## 🔐 إعداد المستخدم الأول (Admin)

### 1. إنشاء مستخدم admin من خلال MongoDB:

```javascript
// اتصل بـ MongoDB واستخدم هذا الكود
use shababna-db

db.users.insertOne({
  username: "admin",
  email: "admin@shababna.org",
  password: "$2a$12$LQv3c1yqBwEHxrVeHPHyC.9VmGm0GpfaL", // كلمة المرور: admin123
  role: "admin",
  firstName: "مدير",
  lastName: "النظام",
  isActive: true,
  permissions: [
    "manage_projects",
    "manage_events",
    "manage_users",
    "view_analytics",
    "manage_settings",
    "upload_files"
  ],
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### 2. أو استخدم API لإنشاء المستخدم:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@shababna.org",
    "password": "admin123",
    "firstName": "مدير",
    "lastName": "النظام",
    "role": "admin"
  }'
```

## 🎯 الوصول للوحة التحكم

### المسارات الهامة:

- **الواجهة الرئيسية:** `http://localhost:5173`
- **لوحة التحكم:** `http://localhost:5173/admin`
- **API:** `http://localhost:5000/api`
- **تسجيل الدخول:** `http://localhost:5173/admin/login`

### بيانات الدخول الافتراضية:

- **البريد الإلكتروني:** admin@shababna.org
- **كلمة المرور:** admin123

## 🛠️ ميزات لوحة التحكم

### 📊 الإحصائيات والتحليلات:

- إحصائيات المستخدمين والمشاريع
- رسوم بيانية تفاعلية
- تتبع الزوار والمشاهدات
- تحليل فئات المشاريع

### 📁 إدارة المحتوى:

- إضافة وتعديل المشاريع
- إدارة الفعاليات
- رفع وإدارة الصور
- نظام الترجمة متعدد اللغات

### 👥 إدارة المستخدمين:

- إضافة مستخدمين جدد
- تعديل الصلاحيات والأدوار
- مراقبة نشاط المستخدمين

### ⚡ تحسينات الأداء:

- تحميل الصور المحسن (lazy loading)
- ضغط الصور التلقائي
- تحسين الحركة والانيميشن
- تخزين مؤقت ذكي

## 🔧 التخصيص والتطوير

### إضافة مشروع جديد:

```typescript
// استخدم API endpoint
POST /api/projects
{
  "title": {
    "ar": "عنوان المشروع بالعربية",
    "en": "Project Title in English",
    "tr": "Türkçe Proje Başlığı"
  },
  "description": {
    "ar": "وصف المشروع بالعربية",
    "en": "Project description in English",
    "tr": "Türkçe proje açıklaması"
  },
  "category": "education",
  "status": "active"
}
```

### إضافة لغة جديدة:

1. أضف ملف ترجمة في `src/i18n/locales/`
2. حدث `src/i18n/index.ts`
3. أضف اللغة في `LanguageSwitcher`

## 🚨 استكشاف الأخطاء

### مشاكل شائعة:

#### 1. خطأ الاتصال بقاعدة البيانات:

```bash
Error: ECONNREFUSED mongodb://localhost:27017
```

**الحل:** تأكد من تشغيل MongoDB

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

#### 2. خطأ JWT:

```bash
Error: JWT secret not provided
```

**الحل:** تأكد من وجود `JWT_SECRET` في ملف `.env`

#### 3. مشاكل رفع الملفات:

```bash
Error: ENOENT: no such file or directory 'uploads'
```

**الحل:** أنشئ مجلد uploads

```bash
mkdir uploads
chmod 755 uploads
```

## 📞 الدعم والمساعدة

### الموارد:

- **الوثائق:** راجع التعليقات في الكود
- **قاعدة البيانات:** استخدم MongoDB Compass لعرض البيانات
- **API Testing:** استخدم Postman أو Insomnia

### لطلب المساعدة:

1. تحقق من ملفات الـ logs
2. راجع متغيرات البيئة
3. تأكد من تشغيل جميع الخدمات

## 🎉 بدء الاستخدام

بعد إكمال الإعداد:

1. سجل دخول للوحة التحكم
2. أضف مشروعك الأول
3. استكشف الإحصائيات
4. خصص الإعدادات حسب احتياجاتك

**مبروك! مشروعك جاهز للاستخدام 🚀**
