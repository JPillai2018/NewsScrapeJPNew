$(document).ready(function() {

    // Scrape sections
    // Function to Scrape new articles. On clicking Scrape Articles button on main page, calls Scrape route.
    // If success display Number of Articles scraped
    // if fails show error message in a Modal window
    $(".button-scrape").on("click", function(e){
        e.preventDefault();
        $.ajax({
            url: "/scrape/newArticles",
            type: "GET",
            success: function(response){
                console.log("Scrape Count= {response.count}");
                $("#numArticles").text(response.count);
            },
            error: function(error){
                showErrorModal(error);
            },
            complete: function(result){
                $("#alertModal").modal("show");
            }
        });
    });

    // Article Sections
    // Function to trigger Save Articles route when a particular article is to be saved.   
    // On click Saved Article buttons, use route for save particlar articles using the article id


    // Function to Scrape new articles. On clicking Scrape Articles button on main page, calls Scrape route.
    // If success display Number of Articles scraped
    // if fails show error message in a Modal window
    // $(".button-savedArticle").on("click", function(e){
    //     console.log("OOOOOOOOOOOOOO");
    //     e.preventDefault();
    //     $.ajax({
    //         url: "/articles/viewSaved/",
    //         type: "GET",
    //         success: function(response){
    //             //$("#numArticles").text(response.count);
    //             //response.redirect('/viewSaved');
    //             //res.render("saved", hbsObject);
    //             console.log("AYYYYYYO=" + response.title);

                
    //         },
    //         error: function(error){
    //             showErrorModal(error);
    //         },
    //         complete: function(result){
    //             //$("#alertModal").modal("show");
    //             console.log ("HOHOHOHHOHOHOHH");
    //             //window.location.href = "/savedArticles";
    //         }
    //     });
    // });

    $(".saveArticle").on("click", function(e){
        //$(document).on('click', '.saveArticle', function (e) {  
            e.preventDefault();      
            var articleId = $(this).data("id");
            console.log("Article ID=" + articleId);
            $.ajax({
                url: "/articles/save/"+articleId,
                type: "GET",
                success: function (response) {
                    window.location.href = "/";
                },
                error: function (error) {
                    showErrorModal(error);
                }
            });
        })
   // Function to Delete an Article usinf the selected Article id using the deletearticle route
    // If success show the message in window
    // If failure show error in Modal popup
    $('.deleteArticleScraped').on('click', function (e){
        e.preventDefault();
        //Saved the article id
        var id = $(this).data('id');
        $.ajax({
          url: '/articles/deleteArticle/'+id,
          type: 'DELETE',
          success: function (response) {
            window.location.href = '/';
          },
          error: function (error) {
            showErrorModal(error);
          }
        });
      });//end of .deleteArticle click event
    

    // Function to Delete an Article usinf the selected Article id using the deletearticle route
    // If success show the message in window
    // If failure show error in Modal popup
    $('.deleteArticleSaved').on('click', function (e){
        e.preventDefault();
        //Saved the article id
        var id = $(this).data('id');
        $.ajax({
          url: '/articles/deleteArticle/'+id,
          type: 'DELETE',
          success: function (response) {
            window.location.href = '/articles/viewSaved';
          },
          error: function (error) {
            showErrorModal(error);
          }
        });
      });//end of .deleteArticle click event
    


    // Notes Section
    // Add a note for an articles

    $(".addNote").on("click", function(e){
        //Clean up the note section to start with
        $("#noteArea").empty();
        $("noteTitleEntry, #noteBodyEntry").val("");  
        // Gets the notes id
        var id = $(this).data("id");
        $("#submitNote","#noteBodyEntry").attr("data-id", id);
        //Using the notes id, reads all notes using the getNotes route. If success display all notes for the article.
        // If error in error Modal window
        $.ajax({
            url: '/notes/getNotes/'+id,
            type: 'GET',
            success: function (data){
              $.each(data.notes, function (i, item){
                showNote(item, id);
              });
              $('#noteModal').modal('show');
            },
            error: function (error) {
              showErrorModal(error);
            }
        });
    });

    //click event to create a note
    $('#submitNote').on('click', function (e) {
        e.preventDefault();
        sendNote($(this));
    });//end of #submitNote click event

    //keypress event to allow user to submit note with enter key
    $('#noteBodyEntry').on('keypress', function (e) {
        if(e.keyCode === 13){
        sendNote($(this));
        }
    });

    //click event to delete a note from a saved article
    $(document).on('click', '.deleteNote', function (e){
        e.stopPropagation();
        var thisItem = $(this);
        var ids= {
            noteId: $(this).parent().data('note-id'),
            articleId: $(this).parent().data('article-id')
        };

    $.ajax({
        url: '/notes/deleteNote',
        type: 'POST',
        data: ids,
        success: function (response) {
            thisItem.parent().remove();
        },
        error: function (error) {
        showErrorModal(error);
      }
    });
    });//end of .deleteNote click event

    //click event to retrieve the title and body of a single note
    //and populate the note modal inputs with it
    $(document).on('click', '.editNote', function (e){
        e.stopPropagation();
        var id = $(this).data('note-id');
        $.ajax({
        url: '/notes/getSingleNote/'+id,
        type: 'GET',
        success: function (note) {
            $('#noteTitleEntry').val(note.title);
            $('#noteBodyEntry').val(note.body);
        },
        error: function (error) {
            console.log(error);
            showErrorModal(error);
        }
        });
    });  


    //event listener to reload root when user closes modal showing
    //number of scraped articles
    $('#alertModal').on('hide.bs.modal', function (e) {
        window.location.href = '/';
    });

    //function to post a note to server
    function sendNote(element) {
        let note = {};
        note.articleId = $(element).attr('data-id'),
        note.title = $('#noteTitleEntry').val().trim();
        note.body = $('#noteBodyEntry').val().trim();
        if (note.title && note.body){
          $.ajax({
            url: '/notes/createNote',
            type: 'POST',
            data: note,
            success: function (response){
              showNote(response, note.articleId);
              $('#noteBodyEntry, #noteTitleEntry').val('');
            },
            error: function (error) {
              showErrorModal(error);
            }
          });
        }
    } 
    
    
    //function to display error modal on ajax error
    function showErrorModal(error) {
        $('#error').modal('show');
    }
    
    
    //function to display notes in notemodal
    function showNote(element, articleId){
        var $title = $('<p>')
          .text(element.title)
          .addClass('noteTitleEdit');
        var $deleteButton = $('<button>')
          .text('')
          .addClass('deleteNote');
        var $editButton = $('<button>')
          .text('')
          .addClass('editNote');          
        var $spacing = $("<br>")
            .appendTo("#noteArea");
        var $line = $("<hr>")
            .appendTo("#noteArea");
        var $note = $('<div>')
          .append($deleteButton, $editButton, $title)
          .attr('data-note-id', element._id)
          .attr('data-article-id', articleId)
          .addClass('note')
          .appendTo('#noteArea');
    } 
    

});
