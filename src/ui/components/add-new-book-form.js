import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bookActions } from '../../actions';
import {
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import {
  Container,
  PaddedPaper,
  CustomButton,
  CustomTextField,
  CustomFormLabel,
} from '../base-kits';

const AllBooksLink = props => <Link to="/all-books" {...props} />;

class AddNewBookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: '',
        author: '',
        translator: '',
        publisher: '',
        description: '',
        coverImage: '',
        categories: '',
        readingStatus: '',
      },
      errors: {
        formError: false,
        titleError: false,
        authorError: false,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = field => event => {
    this.setState(
      {
        formData: {
          ...this.state.formData,
          [field]: event.target.value,
        },
      },
      () => this.validateFormField(field, this.state.formData[field])
    );
  };

  handleSubmit(event) {
    event.preventDefault();
    this.props.saveBook(this.state.formData);
  }

  validateFormField(field, data) {
    if (field === 'title') {
      if (!data) {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            formError: true,
            titleError: true,
          },
        });
      } else {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            formError: false,
            titleError: false,
          },
        });
      }
    } else if (field === 'author') {
      if (!data) {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            formError: true,
            authorError: true,
          },
        });
      } else {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            formError: false,
            authorError: false,
          },
        });
      }
    }
  }

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <PaddedPaper square>
            <Container p={32}>
              <form onSubmit={this.handleSubmit} noValidate>
                <Grid container direction="row" spacing={32}>
                  <Grid item xs={6}>
                    <CustomTextField
                      id="title"
                      label="Title"
                      value={this.state.formData.title}
                      onChange={this.handleChange('title')}
                      margin="none"
                      fullWidth
                      autoFocus
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={this.state.errors.titleError}
                    />
                    <CustomTextField
                      id="author"
                      label="Author"
                      value={this.state.formData.author}
                      onChange={this.handleChange('author')}
                      margin="normal"
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={this.state.errors.authorError}
                    />
                    <CustomTextField
                      id="translator"
                      label="Translator"
                      value={this.state.formData.translator}
                      onChange={this.handleChange('translator')}
                      margin="normal"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <CustomTextField
                      id="publisher"
                      label="Publisher"
                      value={this.state.formData.publisher}
                      onChange={this.handleChange('publisher')}
                      margin="normal"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <CustomTextField
                      id="book-description"
                      label="Book description"
                      value={this.state.formData.description}
                      onChange={this.handleChange('description')}
                      margin="normal"
                      multiline={true}
                      rows={5}
                      rowsMax={5}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomTextField
                      id="book-cover"
                      label="Book cover"
                      value={this.state.formData.coverImage}
                      onChange={this.handleChange('coverImage')}
                      margin="none"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <CustomTextField
                      id="categories"
                      label="Categories"
                      value={this.state.formData.categories}
                      onChange={this.handleChange('categories')}
                      margin="normal"
                      mb={16}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <CustomFormLabel component="legend">
                      Reading Status
                    </CustomFormLabel>
                    <RadioGroup
                      aria-label="Reading Status"
                      name="reading-status"
                      value={this.state.formData.readingStatus}
                      onChange={this.handleChange('readingStatus')}
                    >
                      <FormControlLabel
                        value="completed"
                        control={<Radio />}
                        label="Completed"
                      />
                      <FormControlLabel
                        value="reading"
                        control={<Radio />}
                        label="Reading"
                      />
                      <FormControlLabel
                        value="not-started"
                        control={<Radio />}
                        label="Not started"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Container align="right">
                      <CustomButton
                        variant="contained"
                        color="default"
                        size="small"
                        mr="16"
                        component={AllBooksLink}
                      >
                        Cancel
                      </CustomButton>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        disabled={
                          this.state.errors.formError ||
                          !this.state.formData.title ||
                          !this.state.formData.author
                        }
                      >
                        Save
                      </Button>
                    </Container>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </PaddedPaper>
        </Grid>
      </Grid>
    );
  }
}

const mapActionsToProps = {
  saveBook: bookActions.saveBook,
};

export default connect(
  null,
  mapActionsToProps
)(AddNewBookForm);
