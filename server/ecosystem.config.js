module.exports = {
  apps: [
    {
      name: "project-management",
      scripts: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
