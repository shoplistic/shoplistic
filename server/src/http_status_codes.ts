export const HttpStatusCodes = {
  list: [
    // 1xx Informational response
    { code: 100, status: "Continue" },
    { code: 101, status: "Switching Protocols" },
    { code: 102, status: "Processing (WebDAV; RFC 2518)" },
    { code: 103, status: "Early Hints (RFC 8297)" },
    // 2xx Success
    { code: 200, status: "OK" },
    { code: 201, status: "Created" },
    { code: 202, status: "Accepted" },
    { code: 203, status: "Non-Authoritative Information (since HTTP/1.1)" },
    { code: 204, status: "No Content" },
    { code: 205, status: "Reset Content" },
    { code: 206, status: "Partial Content (RFC 7233)" },
    { code: 207, status: "Multi-Status (WebDAV; RFC 4918)" },
    { code: 208, status: "Already Reported (WebDAV; RFC 5842)" },
    { code: 226, status: "IM Used (RFC 3229)" },
    // 3xx Redirection
    { code: 300, status: "Multiple Choices" },
    { code: 301, status: "Moved Permanently" },
    { code: 302, status: 'Found (Previously "Moved temporarily")' },
    { code: 303, status: "See Other (since HTTP/1.1)" },
    { code: 304, status: "Not Modified (RFC 7232)" },
    { code: 305, status: "Use Proxy (since HTTP/1.1)" },
    { code: 306, status: "Switch Proxy" },
    { code: 307, status: "Temporary Redirect (since HTTP/1.1)" },
    { code: 308, status: "Permanent Redirect (RFC 7538)" },
    // 4xx Client errors
    { code: 400, status: "Bad Request" },
    { code: 401, status: "Unauthorized (RFC 7235)" },
    { code: 402, status: "Payment Required" },
    { code: 403, status: "Forbidden" },
    { code: 404, status: "Not Found" },
    { code: 405, status: "Method Not Allowed" },
    { code: 406, status: "Not Acceptable" },
    { code: 407, status: "Proxy Authentication Required (RFC 7235)" },
    { code: 408, status: "Request Timeout" },
    { code: 409, status: "Conflict" },
    { code: 410, status: "Gone" },
    { code: 411, status: "Length Required" },
    { code: 412, status: "Precondition Failed (RFC 7232)" },
    { code: 413, status: "Payload Too Large (RFC 7231)" },
    { code: 414, status: "URI Too Long (RFC 7231)" },
    { code: 415, status: "Unsupported Media Type" },
    { code: 416, status: "Range Not Satisfiable (RFC 7233)" },
    { code: 417, status: "Expectation Failed" },
    { code: 418, status: "I'm a teapot (RFC 2324, RFC 7168)" },
    { code: 421, status: "Misdirected Request (RFC 7540)" },
    { code: 422, status: "Unprocessable Entity (WebDAV; RFC 4918)" },
    { code: 423, status: "Locked (WebDAV; RFC 4918)" },
    { code: 424, status: "Failed Dependency (WebDAV; RFC 4918)" },
    { code: 426, status: "Upgrade Required" },
    { code: 428, status: "Precondition Required (RFC 6585)" },
    { code: 429, status: "Too Many Requests (RFC 6585)" },
    { code: 431, status: "Request Header Fields Too Large (RFC 6585)" },
    { code: 451, status: "Unavailable For Legal Reasons (RFC 7725)" },
    // 5xx Server errors
    { code: 500, status: "Internal Server Error" },
    { code: 501, status: "Not Implemented" },
    { code: 502, status: "Bad Gateway" },
    { code: 503, status: "Service Unavailable" },
    { code: 504, status: "Gateway Timeout" },
    { code: 505, status: "HTTP Version Not Supported" },
    { code: 506, status: "Variant Also Negotiates (RFC 2295)" },
    { code: 507, status: "Insufficient Storage (WebDAV; RFC 4918)" },
    { code: 508, status: "Loop Detected (WebDAV; RFC 5842)" },
    { code: 510, status: "Not Extended (RFC 2774)" },
    { code: 511, status: "Network Authentication Required (RFC 6585)" },
    // Unofficial codes
    { code: 103, status: "Checkpoint" },
    { code: 218, status: "This is fine (Apache Web Server)" },
    { code: 419, status: "Page Expired (Laravel Framework)" },
    { code: 420, status: "Method Failure (Spring Framework)" },
    { code: 420, status: "Enhance Your Calm (Twitter)" },
    { code: 450, status: "Blocked by Windows Parental Controls (Microsoft)" },
    { code: 498, status: "Invalid Token (Esri)" },
    { code: 499, status: "Token Required (Esri)" },
    { code: 509, status: "Bandwidth Limit Exceeded (Apache Web Server/cPanel)" },
    { code: 526, status: "Invalid SSL Certificate" },
    { code: 530, status: "Site is frozen" },
    { code: 598, status: "(Informal convention) Network read timeout error" },
    // IIS
    { code: 440, status: "Login Time-out" },
    { code: 449, status: "Retry With" },
    { code: 451, status: "Redirect" },
    // nginx
    { code: 444, status: "No Response" },
    { code: 494, status: "Request header too large" },
    { code: 495, status: "SSL Certificate Error" },
    { code: 496, status: "SSL Certificate Required" },
    { code: 497, status: "HTTP Request Sent to HTTPS Port" },
    { code: 499, status: "Client Closed Request" },
    // Cloudflare
    { code: 520, status: "Unknown Error" },
    { code: 521, status: "Web Server Is Down" },
    { code: 522, status: "Connection Timed Out" },
    { code: 523, status: "Origin Is Unreachable" },
    { code: 524, status: "A Timeout Occurred" },
    { code: 525, status: "SSL Handshake Failed" },
    { code: 526, status: "Invalid SSL Certificate" },
    { code: 527, status: "Railgun Error" },
    { code: 530, status: "Origin DNS Error" }
  ],

  getCode(status: string): number | null {

    for (let e of this.list) {

      if (e.status.toLowerCase() === status.toLowerCase()) {

        return e.code;

      }

    }

    return null;

  },

  getFirstStatus(code: number): string | null {

    for (let e of this.list) {

      if (e.code === code) {

        return e.status;

      }

    }

    return null;

  },

  getStatuses(code: number): string[] {

    const r: string[] = [];

    for (let e of this.list) {

      if (e.code === code) {
        r.push(e.status);
      }

    }

    return r;

  }

};
