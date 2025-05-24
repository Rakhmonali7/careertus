export const endpoints = {
  REGISTER_ROLE: "/api/register-role",
  RESUME_UPLOAD: "/api/resume-upload",
  USER_SIGN_IN: (type) => `/api/sign-in/${type}`,
  RESUME_URL: "/api/resume-url",
  JOB_POST: "/api/job-post",
  JOB_UPDATE: "/api/job_update",
  JOB_APPLY: "/api/job-apply",
  JOBS: "/api/jobs",
  USER_INFO: (type) => `/api/user-info/${type}`,
};
