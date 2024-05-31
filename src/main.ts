import "./style.css";

import { Consent, QueryType } from "./types";
import { validateData } from "./utils";

function main() {
  const form = document.querySelector("form") as HTMLFormElement;

  const queryTypeOptions = document.querySelectorAll(
    '.option'
  );
    queryTypeOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
            const clickedOption = e.currentTarget as HTMLElement;
        
            // remove active class from all options
            queryTypeOptions.forEach((option) => {
                option.classList.remove("active");
            });
    
            // add active class to the clicked option
            clickedOption.classList.add("active");
    
            // check the input radio element
            const input = clickedOption.querySelector("input");
            if (input) {
                input.checked = true;
            }
        });
    });

  const successDialog = document.querySelector(
    ".success-dialog"
  ) as HTMLDialogElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const email = formData.get("email") as string;
    const queryType = formData.get("query-type") as QueryType;
    const message = formData.get("message") as string;
    const consent = formData.get("consent") as Consent;

    // clear all errors
    const errorFields = document.querySelectorAll(".error-message");
    errorFields.forEach((field) => {
      field.textContent = "";

        const closestInput = field
            .closest(".form-group")
            ?.querySelector("input, select, textarea");
        if (closestInput) {
            closestInput.classList.remove("error");
        }
    });

    const data = {
      firstName,
      lastName,
      email,
      queryType,
      message,
      consent,
    };

    const errors = validateData(data);

    if (errors.length == 0) {
      form.reset();

      // remove active class from all options
      queryTypeOptions.forEach((option) => {
        option.classList.remove("active");
      });

      if (successDialog) {
        successDialog.showModal();
        // close the dialog when clicked outside
        successDialog.addEventListener("click", (e) => {
          if (e.target === successDialog) {
            successDialog.close();
          }
        });
      }

      return;
    }

    errors.forEach(({ field, message }) => {
      const errorField = document.querySelector(`[data-error="${field}"]`);
      if (errorField) {
        errorField.textContent = message;

        const closestInput = errorField
          .closest(".form-group")
          ?.querySelector("input, select, textarea");
        if (closestInput) {
          closestInput.classList.add("error");
        }
      }
    });
  });
}

main();
