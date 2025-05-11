export const endpoints = {
  REGISTER_ROLE: "/api/register-role",
  RESUME_UPLOAD: "/api/resume-upload",
  USER_SIGN_IN: "/api/sign-in",
  RESUME_URL: "/api/resume-url",
  JOB_POST: "/api/job-post",
  JOB_UPDATE: "/api/job_update",
  JOBS: "/api/jobs",
  USER_INFO: (type) => `/api/user-info/${type}`,
};
