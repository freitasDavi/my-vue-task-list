<template>
  <h1>Lista de tarefas</h1>
  <form @submit.prevent="addTodo()">
    <label>Nova tarefa</label>
    <input v-model="newTodo" name="newTodo" autocomplete="off" />
    <label>Data</label>
    <input v-model="newTodoDate" name="newTodoDate" type="date" />
    <button @click="addTodo()" >Adicionar</button>
  </form>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <span :class="{ done: todo.done }" @click="doneTodo(todo)">{{ todo.content }} - {{ todo.date }}</span>
      <button @click="removeTodo(index)">Remover</button>
    </li>
  </ul>
  <h4 v-if="todos.length === 0">Lista vazia.</h4>
</template>

<script setup>
  const newTodo = ref('');
  const newTodoDate = ref('');
  const defaultData = [
    {
      done: true,
      content: 'Write a blog post',
      date: new Date()
    },
    {
      done: false,
      content: 'Listen a podcast',
      date: new Date()
    }
  ]

  const { $cookies } = useNuxtApp();
  const todosData = $cookies.get('todos') || defaultData;
  const todos = ref(todosData);

  function addTodo() {
    if (newTodo.value) {
      todos.value.push({
        done: false,
        content: newTodo.value,
        date: newTodoDate.value
      })

      newTodo.value = '';
      newTodoDate.value = ''; 
    }

    saveData();
  }

  function doneTodo(todo) {
    todo.done = !todo.done;
    saveData();
  }

  function removeTodo(index) {
    todos.value.splice(index, 1);
    saveData();
  }

  function saveData() {
    $cookies.set('todos', todos.value);
  }

  useHead({
    title: 'ToDo App',
    meta: [
      {
        name: 'description',
        content: 'Nuxt 3 ToDo App with Composition API'
      }
    ]
  })
</script>

<style lang="scss">
  $border: 2px solid
    rgba(
      $color: white,
      $alpha: 0.35
    );

  $size1: 6px;
  $size2: 12px;
  $size3: 18px;
  $size4: 24px;
  $size5: 48px;
  $backgroundColor: #27292d;
  $textColor: white;
  $primaryColor: #a0a4d9;
  $secondTextColor: #1f2023;

  body {
    margin: 0;
    padding: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: $backgroundColor;
    color: $textColor;
    #__nuxt {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      padding: 20px;
      h1 {
        font-weight: bold;
        font-size: 28px;
        text-align: center;
      }
      form {
        display: flex;
        flex-direction: column;
        width: 100%;
        label {
          font-size: 14px;
          font-weight: bold;
        }
        input,
        button {
          height: $size5;
          box-shadow: none;
          outline: none;
          padding-left: $size2;
          padding-right: $size2;
          border-radius: $size1;
          font-size: 18px;
          margin-top: $size1;
          margin-bottom: $size2;
        }
        input {
          background-color: transparent;
          border: $border;
          color: inherit;
        }
      }
      button {
        cursor: pointer;
        background-color: $primaryColor;
        border: 1px solid $primaryColor;
        color: $secondTextColor;
        font-weight: bold;
        outline: none;
        border: $size1;
      }
      h2 {
        font-size: 22px;
        border-bottom: $border;
        padding-bottom: $size1;
      }
      ul {
        padding: 10px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: $border;
          padding: $size2 $size4;
          border-radius: $size1;
          margin-bottom: $size2;
          span {
            cursor: pointer;
          }
          .done {
            text-decoration: line-through;
          }
          button {
            font-size: $size2;
            padding: $size1;;
          }
        }
      }
      h4 {
        text-align: center;
        opacity: 0.5;
        margin: 0;
      }
    }
  }

</style>