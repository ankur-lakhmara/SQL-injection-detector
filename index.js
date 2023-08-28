function hasSQLInjection(input) {
  const sqlInjectionPatterns = [
    // Basic SQL injection patterns
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,

    // UNION and SELECT detection
    /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    /((\%27)|(\'))union/i, // e.g., ' UNION
    /((\%27)|(\'))select/i, // e.g., ' SELECT

    // Stack queries
    /((\%3B)|(;))/i,

    // Comments
    /((\%2D)|(-)){2}/i,

    // Hex-encoded characters
    /((\%27)|(\'))0x[0-9a-fA-F]*/i, // e.g., '0x27

    // Out-of-band retrieval
    /(exec|xp_cmdshell|response\.write)/i, // e.g., EXEC XP_CMDSHELL

    // Time-delay techniques (database dependent)
    /(waitfor\s+delay|benchmark|pg_sleep|sleep)/i, // e.g., WAITFOR DELAY

    // Other SQL keywords and commands
    /((\%27)|(\'))\s*(or|and)\s*((\%27)|(\'))/i, // e.g., ' OR '
    /(drop(\s+)?table|show(\s+)?tables|--|declare|truncate|delete|update|remove)/i, // e.g., DROP TABLE
  ];
  for (let pattern of sqlInjectionPatterns) {
    if (pattern.test(input)) {
      return true;
    }
  }
  return false;
}
function sqlInjectionDetector(req, res, next) {
  const queryParams = Object.values(req.query);
  const bodyParams = Object.values(req.body);
  console.log("i am workinf");
  for (let param of [...queryParams, ...bodyParams]) {
    if (hasSQLInjection(param)) {
      return res.status(400).json({
        message: "Potential SQL Injection detected.",
      });
    }
  }
  next();
}
module.exports = sqlInjectionDetector;
