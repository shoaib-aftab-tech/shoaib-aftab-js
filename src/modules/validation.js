/**
 * Shoaib Aftab JS - Validation Module
 */

export function isEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function isURL(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function isEmpty(val) {
  return val === undefined || val === null || val === '';
}

// Luhn Algorithm Card Validation
export function isCardNumber(num) {
  let value = num.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i));
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0 && value.length >= 12;
}

// Form validation harness
export function validateForm(formId, rules) {
  const form = document.querySelector(formId);
  if (!form) return false;

  let isValid = true;
  
  form.querySelectorAll('.sa-error-msg').forEach(el => el.remove());
  form.querySelectorAll('.sa-invalid').forEach(el => el.classList.remove('sa-invalid'));

  for (const fieldName in rules) {
    const input = form.querySelector(`[name="${fieldName}"], #${fieldName}`);
    if (!input) continue;

    const val = input.value.trim();
    const fieldRules = rules[fieldName];

    for (const rule of fieldRules) {
      let fieldValid = true;
      let msg = '';

      if (rule === 'required' && isEmpty(val)) {
        fieldValid = false;
        msg = 'This field is required.';
      } else if (rule === 'email' && !isEmail(val)) {
        fieldValid = false;
        msg = 'Please enter a valid email address.';
      } else if (rule === 'card' && !isCardNumber(val)) {
        fieldValid = false;
        msg = 'Please enter a valid credit card number.';
      }

      if (!fieldValid) {
        isValid = false;
        input.classList.add('sa-invalid');
        const errEl = document.createElement('div');
        errEl.className = 'sa-error-msg sa-text-danger sa-text-xs sa-mt-1';
        errEl.textContent = msg;
        input.parentNode.appendChild(errEl);
        break;
      }
    }
  }

  return isValid;
}
