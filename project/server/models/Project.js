const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        ar: { type: String, required: true },
        en: { type: String, required: true },
        tr: { type: String, required: true }
    },
    description: {
        ar: { type: String, required: true },
        en: { type: String, required: true },
        tr: { type: String, required: true }
    },
    shortDescription: {
        ar: { type: String },
        en: { type: String },
        tr: { type: String }
    },
    category: {
        type: String,
        required: true,
        enum: ['education', 'health', 'environment', 'technology', 'community', 'sports']
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'completed', 'planned', 'paused', 'cancelled']
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    images: [{
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false }
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    location: {
        country: String,
        city: String,
        address: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    budget: {
        allocated: { type: Number, default: 0 },
        spent: { type: Number, default: 0 },
        currency: { type: String, default: 'USD' }
    },
    team: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: String,
        joinedAt: { type: Date, default: Date.now }
    }],
    beneficiaries: {
        target: { type: Number, default: 0 },
        reached: { type: Number, default: 0 }
    },
    metrics: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        applications: { type: Number, default: 0 }
    },
    tags: [String],
    isPublished: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// إضافة فهرس للبحث النصي
projectSchema.index({
    'title.ar': 'text',
    'title.en': 'text',
    'title.tr': 'text',
    'description.ar': 'text',
    'description.en': 'text',
    'description.tr': 'text'
});

// فهارس للأداء
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ isPublished: 1, isFeatured: 1 });
projectSchema.index({ startDate: -1 });

module.exports = mongoose.model('Project', projectSchema);