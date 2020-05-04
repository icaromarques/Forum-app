import { inject } from 'aurelia-framework';
import { BasicView } from './BasicView';
import { PostService } from '../services/PostService';
import PerfectScrollbar from 'perfect-scrollbar';
import { DialogHandler } from '../utils/dialog/DialogHandler';
import { SessionHandler } from '../utils/SessionHandler';
import { PostTypeEnum } from '../utils/PostTypeEnum';

@inject(PostService, DialogHandler, SessionHandler, PostTypeEnum)
export class Forum extends BasicView {

  questions = {};
  filters = [];
  scrollActive = true;
  noMorePages = false;
  sortField = 'creationDate';
  direction = 'DESC';

  constructor(postService, dialogHandler, sessionHandler, postTypeEnum, ...rest) {
    super(...rest);
    this.postService = postService;
    this.dialogHandler = dialogHandler;
    this.sessionHandler = sessionHandler;
    this.postTypeEnum = postTypeEnum;

  }

  async attached() {
    this.filters.text = null;
    this.filters.withoutAnswers = false;
    this.questions.posts = [];
    this.questions.totalPages = undefined;
    this.questions.page = undefined;

    const container = document.querySelector('.larger-container');
    let ps = new PerfectScrollbar(container);

    this.scrollBar = ps;
    this.findAllQuestions();
  }

  deactivate() {
    this.scrollBar.destroy();
  }

  onClickClearFilters() {
    this.questions.posts = [];
    this.questions.totalPages = undefined;
    this.questions.page = undefined;
    this.scrollActive = true;
    this.scrollBar.scrollTop = 0;
    this.scrollBar.update();
    this.filters.text = null;
    this.filters.withoutAnswers = false;
    this.sortField = 'creationDate';
    this.direction = 'DESC';

    this.findAllQuestions();

  }

  onClickFilter() {
    this.questions.posts = [];
    this.questions.totalPages = undefined;
    this.questions.page = undefined;
    this.scrollActive = true;
    this.scrollBar.update();
    this.findAllQuestions();
  }

  findAllQuestions() {

    if (this.questions.totalPages > 0 && this.questions.page < this.questions.totalPages) {

      this.postService.findAllQuestions(this.questions.page + 1,
         7,
         this.filters.text ? this.filters.text : null,
         this.filters.withoutAnswers,
         this.direction ? this.direction : null,
         this.sortField ? this.sortField : null
         )
        .then((questions) => {
          this.questions.posts = this.questions.posts.concat(questions.posts);
          this.questions.page = questions.page;
          this.questions.totalPages = questions.totalPages;
          this.setTimezone();
          if (this.questions.totalPages > 0 && this.questions.page == this.questions.totalPages) {
            this.scrollActive = false;
          }
          
          this.scrollBar.update();
        });


    } else if (this.questions.totalPages == undefined) {
      this.postService.findAllQuestions(0, 
        7,
        this.filters.text ? this.filters.text : null, 
        this.filters.withoutAnswers,
         this.direction ? this.direction : null,
         this.sortField ? this.sortField : null)
        .then((questions) => {
          this.questions.posts = questions.posts;
          this.questions.page = questions.page;
          this.questions.totalPages = questions.totalPages;
          this.setTimezone();
          if (this.questions.totalPages > 0 && this.questions.page == this.questions.totalPages) {
            this.scrollActive = false;
          }
         
          this.scrollBar.update();
        });

    } else if (this.questions.totalPages > 0 && this.questions.page == this.questions.totalPages) {
      this.scrollActive = false;
      this.scrollBar.update();
    }
  }

  async newQuestion() {
    let loggedUser = this.sessionHandler.getUser();

    if (!loggedUser) {
      let params = {
        "title": this.I18N.tr("user.modal.title"),
        "inputLabel": this.I18N.tr("user.modal.inputLabel"),
        "size": "200",
        "button": this.I18N.tr("user.modal.button"),
        "buttonImage": this.I18N.tr("user.modal.buttonImage")
      };

      let nome = await this.dialogHandler.openDialog(DialogHandler.MODAL_DEFAULT, params, false, false, 'sm');
      if (nome && nome.value != '') {
        this.sessionHandler.loginSaveSession(nome.value);
        loggedUser = nome.value;
      } else {
        await this.dialogHandler.showAlert(this.I18N.tr("user.modal.empty"), 'error');
      }
    }

    if (loggedUser) {
      let params = {
        modal: {
          title: this.I18N.tr("post.modal.question.title"),
          inputTitle: this.I18N.tr("post.modal.question.inputTitle"),
          inputDescription: this.I18N.tr("post.modal.question.inputDescription"),
          buttonSave: this.I18N.tr("post.modal.question.buttonSave"),
          buttonClean: this.I18N.tr("post.modal.question.buttonClean")
        },
        user: loggedUser
      }

      this.dialogHandler.openDialog(DialogHandler.MODAL_POST, params, false, true).then((newQuestion) => {
        if (newQuestion) {
          newQuestion.postType = this.postTypeEnum.type.QUESTION;
          this.createNewQuestion(newQuestion);
        }
      });

    }
  }


  createNewQuestion(newQuestion) {
    this.postService.create(newQuestion).then(() =>
      this.onClickClearFilters()
    ).catch(err => {
      this.dialogHandler.showAlert(err.message, 'error');
    });
  }

  detail(question) {
    this.router.navigateToRoute('question', { 'question': question.id });
  }

  async upVote(question) {

    let loggedUser = this.sessionHandler.getUser();

    if (!loggedUser) {
      let params = {
        "title": this.I18N.tr("user.modal.title"),
        "inputLabel": this.I18N.tr("user.modal.inputLabel"),
        "size": "200",
        "button": this.I18N.tr("user.modal.button"),
        "buttonImage": this.I18N.tr("user.modal.buttonImage")
      };

      let nome = await this.dialogHandler.openDialog(DialogHandler.MODAL_DEFAULT, params, false, false, 'sm');
      if (nome && nome.value != '') {
        this.sessionHandler.loginSaveSession(nome.value);
        loggedUser = nome.value;
      } else {
        await this.dialogHandler.showAlert(this.I18N.tr("user.modal.empty"), 'error');
      }
    }

    if (loggedUser) {
      let updateQuestion = {
        "id": question.id,
        "title": question.title,
        "description": question.description,
        "user": {
          "id": question.user.id
        },
        "creationDate": question.creationDate,
        "postType": this.postTypeEnum.type.QUESTION,
        "upVote": {
          "name": this.sessionHandler.loggedUser
        }
      }

      this.postService.update(updateQuestion).then(() =>
        this.onClickClearFilters()
      ).catch(err => {
        this.dialogHandler.showAlert(err.message, 'error');
      });
    }
  }

  setField(field){
    this.sortField = field;
  }

  setDirection(direction){
    this.direction = direction;
  }

  setTimezone(){
    this.questions.posts.forEach(question => {
      question.creationDate = moment.utc( question.creationDate).local();
      
    });
  }
}
