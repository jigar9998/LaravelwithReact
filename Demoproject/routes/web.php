<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Post;

Route::get('/', function () {
    return view('welcome');
});

///Route::get('/contact', 'PostController@index' );

Route::resource('post', 'PostController');

// Route::get('/read', function () {
//     $post = Post::all();

//     foreach($post as $p){
//         echo $p;
//     }
// });

Route::get('/category', 'PostController@getcategory'  );
Route::get('/newspost', 'PostController@getnewspost'  );
Route::get('/blogpost', 'PostController@getblogpost'  );

// Route::get('/insert', function () {
//     $insert = DB::insert('insert into posts (title , description) values (?,?)' , ['Test' , 'this is test']);

//     echo $insert;
// });

