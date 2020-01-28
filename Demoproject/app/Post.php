<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
class Post extends Model
{
    use SoftDeletes;
    protected $fillable = ['title', 'description', 'image' , 'cat_id'];
    protected $dates = ['deleted_at'];


    
}
