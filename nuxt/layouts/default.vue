<template>
  <div>
    <nav class="navbar sticky-top navbar-toggleable-md navbar-light bg-faded">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="container">
        <a class="navbar-brand">
          <img class="logo" src="~assets/cykel-logo.png"/>
        </a>
        <div class="bg-faded collapse navbar-collapse" id="navbarNav">
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Dashboard</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/scoreboard">Scoreboard</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/rules">Rules</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav">
            <li class="nav-item">
              <a>Sign in</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container content-container">
      <nuxt/>
    </div>
  </div>
</template>

<style>
  .navbar-toggler {
    margin: 10px 0;
  }

  .navbar {
    height: 61px;
    border-color: #e7e7e7;
    border-width: 0 0 1px;
    border-style: solid;
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .navbar-brand {
    margin-top: 6px;
  }

  .nav-item > a {
    padding: 18px 16px 18px 16px;
  }

  .nav-item.active > a {
    color: #fff;
    background-color: #009dde;
  }

  .container {
    margin: auto;
  }

  .content-container {
    padding-top: 16px;
  }

  @media (min-width: 768px) {
    .container {
      width: 750px;
    }
  }
  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }
</style>
