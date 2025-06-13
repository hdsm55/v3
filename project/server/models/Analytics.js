const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['page_view', 'project_view', 'event_view', 'download', 'contact_form', 'registration']
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'entityType'
    },
    entityType: {
        type: String,
        enum: ['Project', 'Event', 'User']
    },
    metadata: {
        page: String,
        userAgent: String,
        ip: String,
        country: String,
        city: String,
        device: String,
        browser: String,
        language: String,
        referrer: String,
        sessionId: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// فهارس للأداء والتحليل
analyticsSchema.index({ type: 1, timestamp: -1 });
analyticsSchema.index({ entityId: 1, entityType: 1 });
analyticsSchema.index({ userId: 1, timestamp: -1 });
analyticsSchema.index({ 'metadata.country': 1 });
analyticsSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);

// مودل إحصائيات يومية مجمعة للأداء السريع
const dailyStatsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    stats: {
        totalViews: { type: Number, default: 0 },
        uniqueVisitors: { type: Number, default: 0 },
        projectViews: { type: Number, default: 0 },
        eventViews: { type: Number, default: 0 },
        registrations: { type: Number, default: 0 },
        contactForms: { type: Number, default: 0 },
        downloads: { type: Number, default: 0 }
    },
    topPages: [{
        page: String,
        views: Number
    }],
    topProjects: [{
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        views: Number
    }],
    topCountries: [{
        country: String,
        visitors: Number
    }],
    deviceBreakdown: {
        mobile: { type: Number, default: 0 },
        desktop: { type: Number, default: 0 },
        tablet: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

dailyStatsSchema.index({ date: -1 });

module.exports.DailyStats = mongoose.model('DailyStats', dailyStatsSchema);