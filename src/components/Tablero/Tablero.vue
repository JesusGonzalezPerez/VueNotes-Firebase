<template>
  <div class="tablero">
      <input type="text" name="" value="" placeholder="Filter..."  v-model="filterSearch" id="filter"/>

      <h1>Proyecto VueCli - Jesús González</h1>

      <hr>

      <p style="color:white;">
        <i class="fa fa-bar-chart" style="font-size:1rem;color:rgb(255, 255, 255)"></i> {{totalPendientes}}
            Tareas pendientes de un total de {{totalNotes}} | 
          <i v-on:click="deleteCompletedNotes" class="fa fa-times" style="font-size:1rem;color:rgb(255, 136, 0)"></i> <strong>Borrar tareas completadas</strong>
      </p>

      <hr>

      <div class="inputs">
        <input type="text" name="" v-model="nota" v-on:keyup.enter="addNote()" placeholder="What do you want to remember?">
      </div>

      <div v-for="(nota, index) in filterList" id="card" v-bind:key="nota.id">
              <div id="subcard">
                  <div class="checkbox">
                      <label>
                          <input v-if="nota.completed" checked type="checkbox" v-on:click="changeEstate(index,nota.id)">
                          <input v-if="!nota.completed" type="checkbox" v-on:click="changeEstate(index,nota.id)">
                          <span class="checkbox-icon-wrapper">
                              <i class="checkbox-icon fa fa-check" style="font-size:2rem;"></i>
                          </span>
                          <span class="textoCheck">
                              {{nota.title}}
                          </span>
                      </label>
                  </div>
                  <div id="fecha">
                      <p style="color: rgb(216, 216, 216);">Fecha: {{nota.date}}</p>
                      <p style="color: rgb(216, 216, 216);;">Prioridad:  
                      <button v-if="nota.priority==0" style="background-color: rgb(140, 233, 235);color:black; border-color: black;" v-on:click="changePriority(index,nota.id)">Low</button>
                      <button v-if="nota.priority==1" style="background-color: rgb(215, 233, 49);color:black; border-color: black;" v-on:click="changePriority(index,nota.id)">Medium</button>
                      <button v-if="nota.priority==2" style="background-color: rgb(255, 102, 0);color:black; border-color: black;" v-on:click="changePriority(index,nota.id)">High</button></p>
                  </div>
              </div>
              <div id="borrar" v-on:click="deleteNote(nota.id)" style="width:5rem;height:5rem;background-color:red;">
                  <i id="trash" class="fa fa-trash" aria-hidden="true"></i>
              </div>
        </div>
    </div>
</template>

<script>
import {db} from "../../db";

export default {
  name: "Tablero",
  data() {
    return {
      nota: "",
      filterSearch: "",
      notas: []
    };
  },  
  firestore:{
    notas : db.collection("listNotes")
  },
  methods: {
    addNote: function () {
      if (isNaN(this.nota)) {
        var fecha = new Date();
        var mes = fecha.getMonth()+1;
        var fechaNota = fecha.getDate() + "/" + mes + "/" + fecha.getFullYear();
        db.collection("listNotes").add({
          title: this.nota,
          completed: false,
          date: fechaNota,
          priority: 0,
        });
      }
    },
    deleteNote: function (id) {
      db.collection("listNotes").doc(id).delete();
    },
    deleteCompletedNotes: function () {
      for(var i=0;i<this.notas.length;i++){
        if(this.notas[i].completed){
          db.collection("listNotes").doc(this.notas[i].id).delete();
        }
      }
    },
    changePriority: function(position,id) {
      var prio = this.notas[position].priority+=1;
      db.collection("listNotes").doc(id).update({ priority: prio });
           if(this.notas[position].priority==3){
              this.notas[position].priority=0;
              db.collection("listNotes").doc(id).update({ priority: 0 });
           }
    },
    changeEstate: function (position,id) {
      if (this.notas[position].completed) {
        db.collection("listNotes")
          .doc(id)
          .update({ completed: false });
      } else {
        db.collection("listNotes")
          .doc(id)
          .update({ completed: true });
      }
    }
  },
  computed: {
    totalNotes: function () {
      return this.notas.length;
    },
    filterList: function () {
        if (this.filterSearch == "") {
            return this.notas;
        }else{
          return this.notas.filter((note) => {
            if ((note.title.indexOf(this.filterSearch))>=0) {
                return true;
            } else {
                return false;
              }
          })
        }
      },
      totalPendientes: function () {
        let total = 0;
        for (var i = 0; i < this.notas.length; i++) {
          if (this.notas[i].completed == false) {
            total++;
          }
        }
        return total;
      },
  }
};
</script>

<style scoped>
  body{
    height: 100vh;
    background-color: rgb(0, 0, 0);
  }
  #filter{
    height: 2rem;
  }
  .tablero{
    min-height: 90vh;
    justify-content: center;
    margin-top: 4rem;
    width:100vw;
    margin-bottom: 2rem;
  }
  h1{
      color:white;
  }
  input{
      width: 95vw;
      height: 10vh;
      padding: 0.5rem;
      border-radius: 0.5rem;
  }
  #filter{
      width: 95vw;
      height: 6vh;
      padding: 0.3rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
  }
  #card{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      width: 95vw;
      padding:2rem;
      background-color: rgb(46, 46, 46);
      color: rgb(0, 255, 191);
      margin:auto;
      margin-top: 1rem;
      border-radius: 0.5rem;
  }
  hr{
      background-color: white;
  }
  .textoCheck{
      font-size: 2rem;
      margin-left: 0.5rem;
      color:white;
  }
  .checkbox {
      width: 100%;
      text-align: left;
  }
  label {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
  }
  .checkbox-icon-wrapper {
      background: rgb(46, 46, 46);
      border: 0.1rem solid #ffffff;
      border-radius: 1rem;
      width: 2rem;
      height: 2rem;
      align-items: center;
  }
  .checkbox-icon {
      color: rgb(0, 255, 191);
  }
  input[type="checkbox"] {
      display: none;
  }       
  .checkbox label input[type="checkbox"] + .checkbox-icon-wrapper > .checkbox-icon {
      opacity: 0;
      transform: scale(0.6);
      width: 2rem;
      transition: all .1s ease-in;
      text-align: center;
  }
  .checkbox label input[type="checkbox"]:checked + .checkbox-icon-wrapper > .checkbox-icon {
      transform: scale(0.6);
      opacity: 1;
      text-align: center;
  }
  .checkbox label input[type="checkbox"]:checked + .checkbox-icon-wrapper{
      border: 0.1rem solid rgb(0, 255, 191);
  }
  .checkbox label input[type="checkbox"]:checked + .checkbox-icon-wrapper + .textoCheck {
      color: rgb(0, 255, 191);
      text-decoration: line-through;
  }
  #fecha{
      color: rgb(106, 106, 106);
  }
  button{
      border-radius: 0.5rem;
      color: rgb(106, 106, 106);
      background-color: rgb(35, 35, 35);
  }
  #borrar{
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
  }
  #borrar i{
      font-size: 2rem;
      color:rgb(255, 255, 255);
  }
  @media (max-width: 642px){
      #card label{
          width:30%;
      }
      #borrar{
          height: 10rem;
      }
  }
</style>
