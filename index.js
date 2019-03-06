let driverID = 0;
let passengerID = 0;
let userID = 0;
let tripID = 0;
let store = {drivers: [], passengers: [], trips: []}

class User {
  constructor(name) {
    this.name  = name;
    this.id = ++userID
    store[this.constructor.name.toLowerCase() + 's'].push(this)
  }

  trips () {
    return store.trips.filter(
      function(trip) {
        return trip[this.constructor.name.toLowerCase() + "Id"] === this.id
      }.bind(this)
    )
  }
}

class Driver extends User {


  passengers () {
    return this.trips().map(function(trip) {
      return store.passengers.find(
        function(passenger) {
          return passenger.id === trip.passengerId
        }
      )
    })
  }
}

class Passenger extends User {
  drivers () {
    return this.trips().map(function(trip) {
      return store.drivers.find(
        function(driver) {
          return driver.id === trip.driverId
        }
      )
    })
  }
}

class Trip {
  constructor(driver, passenger) {
    this.id = ++tripID;
    this.passengerId = passenger.id
    this.driverId = driver.id
    store.trips.push(this)
  }

  driver () {
    return store.drivers.find( 
      function(driver) {
        return driver.id === this.driverId
      }.bind(this)
      )
  }

  passenger () {
    return store.passengers.find( 
      function(passenger) {
        return passenger.id === this.passengerId
      }.bind(this)
      )
  }
}