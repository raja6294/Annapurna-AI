const calculateRemainingWindowMinutes = (expiresAt) => {
  if (!expiresAt) return 0;
  const diff = new Date(expiresAt).getTime() - Date.now();
  return Math.max(0, Math.floor(diff / 60000));
};

const formatWindow = (minutes) => {
  if (minutes <= 0) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

const getUrgencyLevel = (minutes) => {
  if (minutes <= 60) return 'CRITICAL';
  if (minutes <= 120) return 'HIGH';
  if (minutes <= 210) return 'MEDIUM';
  return 'LOW';
};

module.exports = {
  calculateRemainingWindowMinutes,
  formatWindow,
  getUrgencyLevel,
};
