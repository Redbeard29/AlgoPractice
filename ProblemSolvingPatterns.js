//Frequency Counter Problem
//Write a function called same, which accepts two arrays. The function should return 
//true if every value in the array has its corresponding value squared in the second array. 
//The frequency of values must be the same.
//Ex: same([1,2,3], [4,1,9] should return True)
//Ex: same([1,2,3], [1,9] should return False)
//Ex: same([1,2,3], [4,4,1] should return False)

function same(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    for(var x=0; x<arr1.length; x++){
        var correctIndex = arr2.indexOf(arr1[x]** 2)
        if(correctIndex === -1){
            return false;
        }
        arr2.splice(correctIndex,1)
    }
    return true;
}

//option 2
function same2(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    }
    var frequencyCounter1 = {}
    var frequencyCounter2 = {}
    for(var val of arr1){
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
    }
    for(var val of arr2){
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1
    }
    for(var key in frequencyCounter1){
        if(!(key ** 2 in frequencyCounter2)){
            return false;
        }
        if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
            return false;
        }
    }
    return true;
}

//Anagrams using frequency counter
//Given two strings, write a function to determine if the second string is an anagram of the first.
//Ex:validAnagram('','') is True
//Ex:validAnagram('aaz','zza') is False
//Ex:validAnagram('anagram','nagaram') is True
//Ex:validAnagram('rat','car') is False
//Ex:validAnagram('awesome','awesom') is False
//Ex:validAnagram('qwerty','qeywrt') is True
//Ex:validAnagram('texttwisttime','timetwisttext') is True

function validAnagram(str1, str2){
    if(str1.length !== str2.length){
        return false;
    }
    var frequencyCounter = {};
    for(var x=0; x<str1.length; x++){
        var letter = str1[x];
        frequencyCounter[letter] ? frequencyCounter[letter] += 1 : frequencyCounter[letter] = 1;
    }
    for(var x=0; x<str2.length; x++){
        var letter = str2[x];
        if(!frequencyCounter[letter]){
            return false;
        }
        else{
            frequencyCounter[letter] -= 1;
        }
    }
    return true;
}


//Multiple Pointers Problem
//write a function called sumZero which accepts a sorted array of integers. The
//function should find the first pair where the sum is 0. Return an array that includes
//both values that sum to zero or undefined if a pair does not exist
//Ex: sumZero([-3,-2,-1,-,1,2,3]) return [-3,3]
//Ex: sumZero([-2,0,1,3]) returns undefined
//Ex: sumZero([1,2,3]) returns undefined

function sumZero(arr){
    var left = 0;
    var right = arr.length - 1;
    while(left < right){
        var sum = arr[left] + arr[right];
        if(sum === 0){
            return [arr[left], arr[right]];
        }
        else if(sum > 0){
            right --;
        }
        else{
            left ++;
        }
    }
}


//countUniqueValues
//Implement a function called countUniqueValues, which accepts a sorted array, and 
//counts the unique values in the array. There can be negative numbers in the array,
//but it will always be sorted. 
//Ex: countUniqueValues([1,1,1,1,1,2]) returns 2
//Ex: countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) returns 7
//Ex: countUniqueValues([]) returns 0
//Ex: countUniqueValues([-2,-1,-1,0,1]) returns 4

//Naive solution
function countUniqueValues(arr){
    //create empty count variable
    var count = 0;
    //loop through an arr with two values, starting at arr[0] and arr[1]
    for(var x=0, y=1; x,y<arr.length; x++){
        //compare the values
        //if x==y, move y forward
        if(arr[x] == arr[y]){
            y++;
        }
        //if x!==y, add to count, then move y up one,
        else if(arr[x] !== arr[y]){
            count ++;
            y++;
        }
        //if y is at the end of the array, compare x to y, and if they are different, add to count 
        if(y==arr.length){
            if(arr[y] !== arr[x]){
                count ++;
            }
        }
    }
    return count;
}


//More Efficient Solution

function countUniqueValues(arr){
    if(arr.length === 0){
        return 0;
    }
    var i = 0;
    for(var j=1; j<arr.length; j++){
        if (arr[i] !== arr[j]){
            i++;
            arr[i] = arr[j];
        }
    }
    return i+1;
}

//Sliding Window
//write a function called maxSubarraySum which accepts an array of integers 
//and a number called n. The function should calculate the maximum sum of n
//consecutive elements in the array. 
//Ex: maxSubarraySum([1,2,5,2,8,1,5],2) should return 10
//Ex: maxSubarraySum([1,2,5,2,8,1,5],4) should return 17
//Ex: maxSubarraySum([4,2,1,6],1) should return 6
//Ex: maxSubarraySum([4,2,1,6],4) should return 13
//Ex: maxSubarraySum([], 4) should return null

//naive solution

function maxSubarraySum(arr, num){
    if(num > arr.length){
        return null;
    }
    var max = -Infinity;
    for(var x=0; x<arr.length - num + 1; x++){
        temp = 0;
        for(var y=0; y<num; y++){
            temp += arr[x+y];
        }
        if (temp > max){
            max = temp;
        }
    }
    return max;
}

//More Efficient Solution

function maxSubarraySum(arr, num){
    var maxSum = 0;
    var tempSum = 0;
    if(arr.length < num){
        return null;
    } 
    for(var x=0; x < num; x++){
        maxSum += arr[x];
    }
    tempSum = maxSum;
    for(var x = num; x<arr.length; x++){
        tempSum = tempSum - arr[x-num] + arr[x];
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}

//Divide and Conquer 
//Given a SORTED array of integers, write a function called search that accepts a value and returns
//the index where the value passed to the function is located. If the value is not found, return -1
//Ex: search([1,2,3,4,5,6], 4) returns 3
//Ex: search([1,2,3,4,5,6], 6) returns 5
//Ex: search([1,2,3,4,5,6], 11) returns -1

//naive solution AKA Linear Search
function search(arr, val){
    for(var x=0; x<arr.length; x++){
        if(arr[x] === val){
            return x;
        }
    }
    return -1;
}

//Binary Search 
function search(arr, val){
    var min = 0;
    var max = arr.length -1;
    while (min <= max){
        var middle = Math.floor((min + max)/2);

        if (arr[middle] < val){
            min = middle + 1;
        }
        else if(arr[middle] > val){
            max = middle - 1;
        }
        else{
            return middle;
        }
    }
    return -1;
}


//Frequency Counter - sameFrequency
//Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.
//Your solution must be O(N) complexity
//Ex: sameFrequency(182, 281) -> true
//Ex: sameFrequency(34, 14) -> false
//Ex: sameFrequency(3589578, 5879385) -> true
//Ex: sameFrequency(22, 222) -> false

function sameFrequency(int1, int2){
    var int1 = String(int1);
    var int2 = String(int2);
    if(int1.length !== int2.length){
        return false;
    }
    var frequencyCounter = {}
    for(var x=0; x<int1.length; x++){
        var num = int1[x];
        frequencyCounter[num] ? frequencyCounter[num] += 1 : frequencyCounter[num] = 1;
    }
    for(var x=0; x<int2.length; x++){
        var num = int2[x];
        if(!frequencyCounter[num]){
            return false;
        }
        else{
            frequencyCounter[num] -=1;
        }
    }
    return true;
}



//Frequency Counter/Multiple Pointers - areThereDuplicates
//Implement a function called areThereDuplicates which accepts a variable number of arguments and checks whether there are any duplicates
//among the arguments passed in. You can solve using either frequency counter or multiple pointers patterns. 
//Ex: areThereDuplicates(1,2,3) -> false
//Ex: areThereDuplicates(1,2,2) -> true
//Ex: areThereDuplicates('a', 'b', 'c', 'a') -> true

function areThereDuplicates(){
    var argsCounter = {}
    for(var x=0; x<arguments.length; x++){
        var arg = arguments[x];
        argsCounter[arg] ? argsCounter[arg] += 1 : argsCounter[arg] = 1;
    }
    for(var val in argsCounter){
        if(argsCounter[val] > 1){
            return true;
        }
    }
    return false;
}

//Multiple Pointers - Average Pair
//Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the
//array where the average of the pair equals the target average. There may be more than one pair that matches the average target. 
//Ex: averagePair([1,2,3],2.5) -> true
//Ex: averagePair([1,3,3,4,5,6,10,12,19],8) -> true
//Ex: averagePair([-1,0,3,4,5,6], 4.1) -> false
//Ex: averagePair([],4) -> false

function averagePair(arr, num){
    var left = 0;
    var right = arr.length - 1;
    while(left < right){
        var sum = arr[left] + arr[right];
        var avg = (sum/2);
        if(avg === num){
            return true;
        }
        else if(avg > num){
            right --;
        }
        else{
            left ++;
        }
    }
    return false;
}


//Multiple Pointer - Is Subsequence:
//Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence
//of the characters in the second string. In other words, the functions should check whether the characters in the first string appear
//somewhere in the second string, WITHOUT THEIR ORDER CHANGING.
//Ex: isSubsequence('hello', 'hello world') -> true
//Ex: isSubsequence('sing', 'sting') -> true
//Ex: isSubsequence('abc', 'abracadabra') -> true
//Ex: isSubsequence('abc', 'acb') -> false

function isSubsequence(str1, str2){
    var x = 0;
    if(!str1) return true;
    for(var y=0; y<str2.length; y++){
        if(str1[x] == str2[y] && (x == str1.length-1)){
            return true;
        }
        else if(str1[x] == str2[y]){
            x++;
        }
    }
    return false;
}

//Sliding Window - Max Subarray Sum
//Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum of a subarray with the length
//of the number passed to the function. Note that a subarray must consist of consecutive elements from the original array. In the first
//example below, [100,200,300] is a subarray of the original array, but [100,300] is not.
//Ex: maxSubarraySum([100,200,300,400], 2) -> 700
//Ex: maxSubarraySum([1,4,2,10,23,3,1,0,20], 4) -> 39
//Ex: maxSubarraySum([-3,4,0,-2,6,-1]) -> 5
//Ex: maxSubarraySum([2,3], 3) -> null

function maxSubarraySum2(arr, num){
    var maxSum = 0;
    var tempSum = 0;
    if(num > arr.length){
        return null;
    }
    for(var x=0; x < num; x++){
        maxSum += arr[x];
    }
    tempSum = maxSum;
    for(var x = num; x<arr.length; x++){
        tempSum = tempSum - arr[x-num] + arr[x];
        if(tempSum > maxSum){
            maxSum = tempSum;
        }
    }
    return maxSum;
}

//Sliding Window - minSubArrayLen
//Write a function called minSubArrayLen which accepts to paramaters - an array of positive integers and a positive integer. This function
//should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function.
//If there isn't one, return 0 instead.
//Ex: minSubArrayLen([2,3,1,2,4,3], 7) -> 2
//Ex: minSubArrayLen([2,1,6,5,4], 9) -> 2
//Ex: minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) -> 1
//Ex: minSubArrayLen([1,4,16,22,5,7,8,9,10], 39) -> 3
//Ex: minSubArrayLen([1,4,16,22,5,7,8,9,10], 55) -> 5
//Ex: minSubArrayLen([4,3,3,8,1,2,3], 11) -> 2
//Ex: minSubArrayLen([1,4,16,22,5,7,8,9,10], 95) -> 0

function minSubArrayLen(arr, num){
    var start = 0;
    var total = 0;
    var end = 0;
    var minLength = Infinity;

    while(start<arr.length){
        if(total < num && end < arr.length){
            total += arr[end];
            end ++;
        }
        else if(total >= num){
            minLength = Math.min(minLength, end-start);
            total -= arr[start];
            start ++;
        }
        else{
            break;
        }
        console.log(total);
    }
    return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52))

//Sliding Window - findLongestSubstring
//Write a function called findLongestSubstring, which accepts a string and returns the length of the longest substring with all distinct
//characters. 
//Ex: findLongestSubstring(['']) -> 0
//Ex: findLongestSubstring(['rithmschool']) -> 7
//Ex: findLongestSubstring(['thisisawesome']) -> 6
//Ex: findLongestSubstring(['thecatinthehat']) -> 7
//Ex: findLongestSubstring(['bbbbbb']) -> 1
//Ex: findLongestSubstring(['longestsubstring']) -> 8
//Ex: findLongestSubstring(['thisishowwedoit']) -> 6

function findLongestSubstring(str){
    var lenCount = 0;
    var letterCount = {};
    var beginStr = 0;
    
    for(var x=0; x<str.length; x++){
        var letter=str[x];
        if(letterCount[letter] && letterCount[letter] > beginStr){
            beginStr = letterCount[letter];
        }
        if(x - beginStr + 1 > lenCount){
            lenCount = x - beginStr + 1;
        }
        letterCount[letter] = x + 1;
    }
    return lenCount;
}