const saveBtn = document.getElementById("saveBtn");
const timeline = document.getElementById("timeline");
const input = document.getElementById("task");
const task = document.getElementById("table-task");
const progressBar = document.getElementById("progress-bar-fill");

let numOfTask = 0;

// Fungsi untuk update tampilan jumlah task
function updateTaskCountDisplay() {
  const total = document.querySelectorAll(".doneBtn").length;
  document.querySelector(
    "h3"
  ).textContent = `Task Complete : ${numOfTask} of ${total}`;
}

// Fungsi untuk update progress bar
function updateProgressBar() {
  const total = document.querySelectorAll(".doneBtn").length;
  const progressPercent = total === 0 ? 0 : (numOfTask / total) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressBar.style.backgroundColor = "lightblue";
}

// Fungsi utama ketika tombol Save ditekan
saveBtn.addEventListener("click", () => {
  try {
    const inputValue = input.value.trim();
    // const [tanggal, waktu] = dateTime.value.split("T");
    const inputTime = timeline.value;

    if (inputValue !== "" && inputTime !== "") {
      const newRow = document.createElement("tr");

      newRow.innerHTML = `
        <td style="padding: 30px 0 5px 0; text-align: center">${inputValue}</td>
        <td style="padding: 30px 0 5px 0; text-align: center">${inputTime}</td>
        <td style="padding: 30px 0 5px 0; text-align: center">
          <button class="removeBtn"><i class="ri-delete-bin-line"></i></button>
          <button class="editBtn"><i class="ri-edit-line"></i></button>
          <button class="doneBtn"><i class="ri-check-line"></i></button>
        </td>
      `;

      task.appendChild(newRow);
      input.value = "";
      timeline.value = "";

      attachTaskEvent(newRow);
      updateTaskCountDisplay();
      updateProgressBar();
    } else {
      throw new Error("Input tidak boleh kosong");
    }
  } catch (error) {
    alert(error.message);
  }
});

// Fungsi untuk memberi event listener ke tombol di setiap baris
function attachTaskEvent(row) {
  const removeBtn = row.querySelector(".removeBtn");
  const editBtn = row.querySelector(".editBtn");
  const doneBtn = row.querySelector(".doneBtn");

  // Tombol remove
  removeBtn.addEventListener("click", () => {
    const isTaskDone =
      row.querySelector("td").style.textDecoration === "line-through";
    if (isTaskDone) {
      numOfTask--;
    }

    row.remove();
    updateTaskCountDisplay();
    updateProgressBar();
  });

  // Tombol edit
  editBtn.addEventListener("click", () => {
    const td = row.querySelector("td");
    const currentText = td.textContent;
    const inputTask = prompt("Edit your task:", currentText);
    if (inputTask !== null && inputTask.trim() !== "") {
      td.textContent = inputTask.trim();
    }
  });

  // Tombol done
  doneBtn.addEventListener("click", () => {
    if (doneBtn.disabled) return;

    numOfTask++;
    row.querySelector("td").style.textDecoration = "line-through";

    updateTaskCountDisplay();
    updateProgressBar();

    doneBtn.disabled = true;
    doneBtn.style.opacity = "0.5";
  });
}
