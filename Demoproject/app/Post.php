<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
class Post extends Model
{
    use SoftDeletes;
    protected $fillable = ['title', 'description', 'image' , 'category_id'];
    protected $dates = ['deleted_at'];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    
}
