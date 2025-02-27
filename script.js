async function callAPII() {
  try {
    // Ensure the correct path to the JSON file
    const response = await fetch("/myJSON.json"); // Ensure this is correct

    const data = await response.json(); // Parse the JSON file

    function countCategorieswithID(id) {
      let c = 0;
      data.todos.forEach((todo) => {
        if (todo.category_id === id) c++;
      });
      return c;
    }

    // Added to categories
    data.categories.forEach((categorie) => {
      const li = document.createElement("li");
      li.classList.add("category-item");
      li.setAttribute("id", `${categorie.id}`);

      li.innerHTML = `
                    <div class="category-icon">${categorie.logo}</div>
                    <div class="category-name">${categorie.name}</div>
                    <div class="task-count">${countCategorieswithID(
                      categorie.id
                    )}</div>
                    `;

      console.log(li);
      document.getElementById("categoryList").appendChild(li);

      //If anyone Click on Category, it will show Every Task by this catagory
      li.addEventListener("click", (e) => {

        document.getElementById("taskGrid").innerHTML = "";
        document.querySelector(".content-title").innerText = `All Tasks in the ${categorie.name} Category`;
        console.log(categorie);
        const id = categorie.id;
        console.log(id);
        data.todos.forEach((eachTodo) => {
          if (eachTodo.category_id == id) {
            const div = document.createElement("div");
            div.classList = "task-card";

            div.innerHTML = `
               <div class="card-header">
                    <div class="card-status status-in-progress"></div>
                    <span class="card-priority priority-${eachTodo.priority}">${eachTodo.priority}</span>
                    <h3 class="card-title">${eachTodo.title}</h3>
                    <p class="card-description">${eachTodo.description}</p>
                    <div class="due-date due-soon">
                        <span>Due: Mar 5, 2025</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-meta">
                        <span>Created: Feb 27, 2025</span>
                        <span>ID: 1</span>
                    </div>
                    <div class="card-tags">
                    ${
                      eachTodo.tags.map((eachTag)=> {
                        return `<span class="tag">${eachTag}</span>`;
                      }).join(" ")
                    }
                        <span class="tag">deadline</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-status-text">
                        in progress
                    </div>
                    <div class="card-actions">
                        <button class="card-btn edit-btn">✏️</button>
                        <button class="card-btn delete-btn">🗑️</button>
                    </div>
                </div>
            `;

            document.getElementById("taskGrid").appendChild(div);
          }
        });
      });
    });
  } catch (error) {
    console.error("Error reading JSON:", error);
  }
}

callAPII();
