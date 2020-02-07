<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Category;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $post = Post::paginate(3);
        //$post->withPath('custom/url');
        return response()->json($post);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
            //echo $request->file('image');die;
            $this->validate($request, [
                'title' => 'required',
                'desc' => 'required',
                'image' => 'required',
                'category' => 'required'
            ]);
            $post = new Post;
            $post->title = $request->title;
            $post->description = $request->desc;
            $post->cat_id = $request->category;
            if ($request->hasFile('image')) {
                $uniqueid=uniqid();
                $extension=$request->file('image')->getClientOriginalExtension();
                $name=$uniqueid.'.'.$extension;
                $path=$request->file('image')->storeAs('public/uploads',$name);
                $post->image = $path;
            }
            $post->save();
            return response()->json('Successfully added');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        $post = Post::find($id);
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        $post->title = $request->get('title');
        $post->description = $request->get('desc');
        $post->cat_id = $request->get('category');
        print_r($request->file('image'));   
        if ($request->hasFile('image')) {
            $dir = 'uploads/';
            if ($post->image != '' && File::exists($dir . $post->image)) {
                File::delete($dir . $image->image);
            }    
            $uniqueid=uniqid();
            $extension=$request->file('image')->getClientOriginalExtension();
            $name=$uniqueid.'.'.$extension;
            $path=$request->file('image')->storeAs('public/uploads',$name);
            $post->image = $path;
        }
        $post->save();
        return response()->json('Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();
        
        return response()->json('Successfully deleted');
    }

    public function getcategory(){
        $category = Category::all();

        return response()->json($category);
    }

    public function getnewspost(Category $category){
        $news_post = Category::find(1)->post;
        return response()->json($news_post);
    }

    public function getblogpost(){
        $blog_post = Category::find(2)->post;

        return response()->json($blog_post);
    }
    public function addcategory(Request $request){
        $this-> validate($request, [
            'category' => 'required|string|max:255',
        ]);

        $data = Category::create([
            'category_name' => $request['category']
        ]);
        return response()->json('Successfully added');
    }
}
