/**
 * Shoaib Aftab JS - Premium Components & Interactive Controllers
 */

// 1. Dynamic Clipboard Helper
export const clipboard = {
  copy: function(text) {
    return new Promise(function(resolve, reject) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(resolve)
          .catch(reject);
      } else {
        // Fallback for older browsers
        try {
          var textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          var success = document.execCommand("copy");
          document.body.removeChild(textarea);
          if (success) {
            resolve();
          } else {
            reject(new Error("Fallback copy failed"));
          }
        } catch (e) {
          reject(e);
        }
      }
    });
  }
};

// 2. Interactive Modals Controller
export const modal = {
  open: function(modalId) {
    var modalEl = document.getElementById(modalId);
    if (modalEl) {
      modalEl.classList.add("sa-modal-open");
      modalEl.classList.add("sa-active");
    }
  },
  close: function(modalId) {
    var modalEl = document.getElementById(modalId);
    if (modalEl) {
      modalEl.classList.remove("sa-modal-open");
      modalEl.classList.remove("sa-active");
    }
  },
  bindBackdrop: function(modalId) {
    var modalEl = document.getElementById(modalId);
    if (modalEl) {
      modalEl.addEventListener("click", function(e) {
        if (e.target === modalEl) {
          modal.close(modalId);
        }
      });
    }
  }
};

// 3. Dropdowns Controller
export const dropdown = {
  toggle: function(dropdownId) {
    var dropdownEl = document.getElementById(dropdownId);
    if (dropdownEl) {
      dropdownEl.classList.toggle("sa-active");
    }
  },
  bindClickOutside: function(dropdownId) {
    var dropdownEl = document.getElementById(dropdownId);
    if (dropdownEl) {
      document.addEventListener("click", function(e) {
        if (!dropdownEl.contains(e.target)) {
          dropdownEl.classList.remove("sa-active");
        }
      });
    }
  }
};

// 4. Dark/Light Theme Manager
export const theme = {
  set: function(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("sa-theme", themeName);
  },
  get: function() {
    return localStorage.getItem("sa-theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  },
  init: function() {
    var currentTheme = theme.get();
    theme.set(currentTheme);
  },
  toggle: function() {
    var currentTheme = theme.get();
    var nextTheme = currentTheme === "dark" ? "light" : "dark";
    theme.set(nextTheme);
    return nextTheme;
  }
};
