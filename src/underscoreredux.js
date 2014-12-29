(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === 0) { return [] };
    return n === undefined ? array[array.length-1] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (collection.constructor === Object) {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    } else if(collection.constructor === Array) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var yesArray = [];
    _.each(collection, function(s) {
      if (test(s)) {
        yesArray.push(s);
      }
    });
    return yesArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {

    var noArray = _.filter(collection, function(s) {
      return !test(s);
    });
    return noArray;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var uniArr = [];
    var used = [];
    if (isSorted) {
      // var newVal;
      // for (var i = 0; i < array.length; i++) {
      //   newVal = iterator(array[i]);
      //   if( _.indexOf(used, newVal) < 0) {
      //     uniArr.push(newVal);
      //     used.push(newVal);
      //   }
      // }
      for (var i = 0; i < array.length; i++) {
        if( _.indexOf(used, array[i]) < 0) {
          uniArr.push(array[i]);
          used.push(array[i]);
        }
      }   
    } else {
      for (var i = 0; i < array.length; i++) {
        if( _.indexOf(used, array[i]) < 0) {
          uniArr.push(array[i]);
          used.push(array[i]);
        }
      }
    }
    return uniArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var newArr = [];
    _.each(collection, function(t) {
      newArr.push(iterator(t));
    })
    return newArr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var current;
    var startingPoint = 0;
    var isObject;
    var objectKeys;

    if (collection.constructor === Object) {
      isObject = true;
      objectKeys = Object.keys(collection);
    }

    if (accumulator !== undefined) {
      current = accumulator;
    } else {
      current = collection[0] || collection[objectKeys[0]];
      startingPoint++;
    }

    if (isObject) {
      for (var i = startingPoint; i < objectKeys.length; i++) {
          current = iterator(current, collection[objectKeys[i]]);
        }
    } else { 
      for (var i = startingPoint; i < collection.length; i++) {
          current = iterator(current, collection[i]);
        }
    }

    return current;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (collection === [] || collection === {}) {
      return true;
    }
    return _.reduce(collection, function(allTrue, currentItem) {
      if (!iterator && allTrue !== false) {
        return currentItem === true;
      }
      if (iterator && iterator(currentItem) && allTrue !== false) {
        return true;
      }
      else {
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (collection === [] || collection === {}) {
      return false;
    }
    if (!iterator) {
      iterator = function(r) { return r == true; };
    }

    var inverse = function(s) {
      return !iterator(s) === true;
    }

    return !_.every(collection, inverse);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    if (arguments.length > 1) {
      for (var n = 1; n < arguments.length; n++) {
        for (var key in arguments[n]) {
          obj[key] = arguments[n][key];
        }
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if (arguments.length > 1) {
      for (var n = 1; n < arguments.length; n++) {
        for (var key in arguments[n]) {
          if(!obj.hasOwnProperty(key)) {
            obj[key] = arguments[n][key];
          }
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var alreadyComputed = {};
    var result;
    var args;

    return function() {
      args = Array.prototype.slice.call(arguments);
      if(!(args in alreadyComputed)) {
        result = func.apply(this, arguments);
        alreadyComputed[args] = result;
      } else {
        result = alreadyComputed[args];
      }
      return result;
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var originArgs = arguments;
    // var targetTime = new Date().getTime() + wait;

    // while(targetTime < new Date().getTime()) {}
    setTimeout(function(){
      if (originArgs.length > 2) {
        var args = Array.prototype.slice.call(originArgs, 2);
        func.apply(this,args);
      }
      else {
        func();
      }
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffledArray = [];
    var size = array.length;
    var indicesUsed = [];
    var randomIndex = -1;

    for(var i = 0; i < size; i++) {
      randomIndex = Math.floor(Math.random() * size);
      while(_.contains(indicesUsed, randomIndex)) {
        randomIndex = Math.floor(Math.random() * size);
      }
      shuffledArray[randomIndex] = array[i];
      indicesUsed.push(randomIndex);
    }
    return shuffledArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var args = Array.prototype.slice.call(arguments, 2);
    var isMethod = (functionOrKey.constructor !== Function);

    return _.map(collection, function(s) {
      return (isMethod ? s[functionOrKey].apply(s, args) : functionOrKey.apply(s, args));
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var isString;
    if (typeof iterator === 'string') { isString = true; }

    return _.pluck(_.map(collection, function(val, i) {
      if(isString) {
        return {
          value: val,
          index: i,
          valToSort: (val === undefined ? undefined : val[iterator])
        };
      } else {
        return {
          value: val,
          index: i,
          valToSort: (val === undefined ? undefined : iterator(val))
        };
      }
    }).sort(function(current,next) {
      var cVal = current.valToSort;
      var nVal = next.valToSort;

      if(cVal !== nVal) {
        if (cVal === undefined) { return 1; }
        if (nVal === undefined) { return -1; }
        if (cVal > nVal) { return 1; }
        if (nVal > cVal) { return -1; }
      }
      return 0;
    }),'value');
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var zippedArr = [];

    var maxLength = 0;
    _.each(args,function(arg) { 
      maxLength = Math.max(maxLength,arg.length);
    }); 
    
    for(var i = 0; i < maxLength; i++) {
      _.each(args,function(elt) {
        
        if(zippedArr[i] === undefined) {
          zippedArr[i] = [];
          zippedArr[i].push(elt[i]);
        } else {
          zippedArr[i].push(elt[i]);
        }
      });
    } 

    return zippedArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if(!result) { result = []; }

    for(var i = 0; i < nestedArray.length; i++) {
      if(nestedArray[i].constructor === Array) {
        _.flatten(nestedArray[i], result);
      } else {
        result.push(nestedArray[i]);
      }
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var shared = true;
    var newArr = [];
    var args = Array.prototype.slice.call(arguments);
    var maxLength = 0;
    var largestArg;

    _.each(args,function(arg, i) { 
      if(arg.length > maxLength){
        maxLength = arg.length;
        largestArg = i;
      }
    });
    _.each(args[largestArg], function(elt) {
      for(var n = 0; n < args.length; n++) {
        if(_.indexOf(args[n], elt) === -1) {
          shared = false;
          break;
        }
      }
      if(shared === true) { newArr.push(elt); }
      shared = true;
    });
    return newArr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var whatsLeft = [];
    var inAnotherArray = false;
    console.log(array);
    var difArgs = Array.prototype.slice.call(arguments, 1);
    console.log("The arguments "+difArgs);
    if(difArgs === undefined) { return array; }
    _.each(array, function(elt) {
      for(var i = 0; i < difArgs.length; i++) {
        console.log(_.indexOf(difArgs[i], elt) > 0);
        if(_.contains(difArgs[i], elt)) {
          console.log("Found it!");
          inAnotherArray = true;
          break;
        }
      }
      if(inAnotherArray === false) { whatsLeft.push(elt); }
      inAnotherArray = false;
    });
    console.log(whatsLeft);
    return whatsLeft;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
