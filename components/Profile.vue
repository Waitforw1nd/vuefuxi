<template>
  <div class="resume-container">
    <div class="header-section">
      <h1 class="title">
        <el-icon><UserFilled /></el-icon> {{ this.$store.state.userName }}的简历
      </h1>
    </div>

    <el-card class="resume-card animate-fade-in">
      <template #header>
        <div class="card-header">
          <el-icon><InfoFilled /></el-icon>
          <span>基本信息</span>
        </div>
      </template>
      
      <el-row class="info-row">
        <el-col :span="18">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="姓名">
                <span>{{ basicInfo.name || '未填写' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期">
                <span>{{ basicInfo.birthDay || '未填写' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <span>{{ basicInfo.gender || '未填写' }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址">
                <span>{{ basicInfo.address || '未填写' }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        
        <el-col :span="6" class="avatar-container">
          <el-avatar 
            :src="basicInfo.picture || 'https://picsum.photos/200/200'" 
            :size="160" 
            shape="square"
            class="avatar"
          >
            <el-icon v-if="!basicInfo.picture"><User /></el-icon>
          </el-avatar>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="resume-card animate-fade-in" style="animation-delay: 0.1s">
      <template #header>
        <div class="card-header">
          <el-icon><School /></el-icon>
          <span>教育背景</span>
        </div>
      </template>
      
      <el-row :gutter="20" class="education-row">
        <el-col :span="12">
          <el-form-item label="大学">
            <span>{{ education.university || '未填写' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学位">
            <span>{{ education.academicDegree || '未填写' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="主修专业">
            <span>{{ education.major || '未填写' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="毕业时间">
            <span>{{ education.graduationTime || '未填写' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="resume-card animate-fade-in" style="animation-delay: 0.2s">
      <template #header>
        <div class="card-header">
          <el-icon><Suitcase /></el-icon>
          <span>工作经历</span>
        </div>
      </template>
      
      <div class="work-experience">
        <el-timeline>
          <el-timeline-item
            v-for="(experience, index) in workExperience"
            :key="index"
            :timestamp="experience.workTime"
            :color="index === 0 ? '#409EFF' : '#67C23A'"
            placement="top"
          >
            <el-card class="experience-card">
              <div class="experience-header">
                <h3 class="company-name">{{ experience.companyName }}</h3>
                <span class="position">{{ experience.major }}</span>
              </div>
              <div class="experience-content">
                {{ experience.content }}
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>

    <el-card class="resume-card animate-fade-in" style="animation-delay: 0.3s">
      <template #header>
        <div class="card-header">
          <el-icon><StarFilled /></el-icon>
          <span>技能特长</span>
        </div>
      </template>
      
      <div class="skills-container">
        <el-tag
          v-for="(skill, index) in skills"
          :key="index"
          type="info"
          effect="light"
          class="skill-tag"
        >
          {{ skill }}
        </el-tag>
      </div>
    </el-card>

    <el-card class="resume-card animate-fade-in" style="animation-delay: 0.4s">
      <template #header>
        <div class="card-header">
          <el-icon><EditPen /></el-icon>
          <span>自我评价</span>
        </div>
      </template>
      
      <div class="self-evaluation">
        {{ selfEvaluation }}
      </div>
    </el-card>

    <div class="loading-mask" v-if="loading">
      <el-loading-spinner></el-loading-spinner>
    </div>
  </div>
</template>

<script>
import { 
  UserFilled, 
  InfoFilled, 
  School, 
  User, 
  Close, 
  Suitcase, 
  StarFilled,
  EditPen 
} from '@element-plus/icons-vue'

export default {
  props: ['userName'],
  components: {
    UserFilled,
    InfoFilled,
    School,
    User,
    Close,
    Suitcase,
    StarFilled,
    EditPen
  },
  data() {
    return {
      basicInfo: {
        name: "",
        birthDay: "",
        gender: "",
        address: "",
        picture: ""
      },
      education: {
        university: "",
        academicDegree: "",
        major: "",
        graduationTime: ""
      },
      workExperience: [],
      skills: [],
      selfEvaluation: "",
      loading: true
    }
  },
  methods: {
    quit() {
      this.$store.commit("setLoginFlag", false)
      localStorage.removeItem("loginFlag")
      this.$router.push("/")
    }
  },
  mounted() {
    var _this = this;
    this.$axios.get("http://localhost:8081/resume.json")
      .then(response => {
        var resume = response.resume.filter(item => {
          return item.basicInfo.name === this.$store.state.userName
        })[0];
        if (resume) {
          this.basicInfo = resume.basicInfo || {}
          this.education = resume.education || {}
          this.workExperience = resume['workExperience'] || []
          this.skills = resume['skills'] || []
          this.selfEvaluation = resume['selfEvaluation'] || ''
        } else {
          this.$message.warning('未找到用户简历信息')
        }
      })
      .catch(error => {
        console.error('获取简历失败:', error)
        this.$message.error('获取简历信息失败')
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style scoped>
.resume-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  display: flex;
  align-items: center;
}

.title el-icon {
  margin-right: 10px;
  color: #409eff;
  font-size: 28px;
}

.resume-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.resume-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.card-header el-icon {
  margin-right: 8px;
  color: #409eff;
  font-size: 20px;
}

.info-row, .education-row {
  padding: 20px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  border: 2px solid #409eff;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.work-experience {
  padding: 20px;
}

.experience-card {
  border-radius: 6px;
  box-shadow: none;
  border: 1px solid #ebeef5;
  transition: all 0.3s ease;
}

.experience-card:hover {
  border-color: #409eff;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.company-name {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.position {
  color: #606266;
  font-size: 14px;
}

.experience-content {
  color: #909399;
  line-height: 1.6;
}

.skills-container {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}  
</style>