export const sendSuccess = (res, status, data) => {
  res.status(status);
  res.json({ success: true, data });
};

export const sendError = (res, status, message) => {
  res.status(status);
  res.json({ success: false, error: message });
};
