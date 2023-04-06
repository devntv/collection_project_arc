import type { CountryCode } from 'libphonenumber-js';
import { parsePhoneNumber } from 'libphonenumber-js';
import * as yup from 'yup';

declare module 'yup' {
  export interface StringSchema {
    /**
     * Check for phone number validity.
     *
     * @param {String} (Optional) The country code to check against.
     * @param {String} (Optional) The error message to return if the validation fails.
     */
    phone(contryCode?: CountryCode, errorMessage?: string): StringSchema;
  }
}

const YUP_PHONE_METHOD = 'phone';

yup.addMethod(
  yup.string,
  YUP_PHONE_METHOD,
  function (countryCode?: CountryCode, errorMessage?: string) {
    return this.test(
      YUP_PHONE_METHOD,
      errorMessage ? errorMessage : '${path} must be a valid phone number',
      (value) => {
        try {
          if (!value) return false;
          const phoneNumber = parsePhoneNumber(value, countryCode);
          if (!phoneNumber) return false;
          let result = phoneNumber.isPossible();
          if (countryCode) {
            result =
              phoneNumber.isPossible() && phoneNumber.country === countryCode;
          }
          return result;
        } catch (error) {
          return false;
        }
      }
    );
  }
);
