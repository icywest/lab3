document.addEventListener("DOMContentLoaded", () => {
    window.showEditForm = function (postId) {
      const form = document.getElementById(`edit-form-${postId}`);
      if (form) {
        form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
        console.log(`Toggled form ${postId}, new display: ${form.style.display}`);
      } else {
        console.error(`Form not found for post ${postId}`);
      }
    };
  });
  