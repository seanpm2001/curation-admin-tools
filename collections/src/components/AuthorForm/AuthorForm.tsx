import React, { useState } from 'react';
import slugify from 'slugify';
import { AuthorModel } from '../../api';
import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core';
import { Button } from '../';

interface EditAuthorFormProps {
  /**
   * An object with everything author-related in it.
   */
  author: AuthorModel;

  /**
   * Do we need to show the cancel button? Not on the 'Add Author' page
   * True by default
   */
  showCancelButton?: boolean;

  /**
   * What to do if the user clicks on the Cancel button
   */
  handleCancel?: () => void;
}

export const AuthorForm: React.FC<EditAuthorFormProps> = (
  props
): JSX.Element => {
  const [author, setAuthor] = useState<AuthorModel>(props.author);

  const { showCancelButton = true, handleCancel } = props;

  /**
   * Update form field values on change.
   */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name = event.target.name as keyof typeof author;

    setAuthor({
      ...author,
      [name]: event.target.value,
    });
  };

  /**
   * Update the switch on change
   */
  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor({ ...author, active: event.target.checked });
  };

  /**
   * Suggest a slug for the author
   */
  const suggestSlug = () => {
    const newSlug = slugify(author.name, { lower: true });
    setAuthor({ ...author, slug: newSlug });
  };

  return (
    <form name="author-form">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="name"
            name="name"
            label="Full name"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            variant="outlined"
            value={author.name ?? ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex">
            <Box flexGrow={1} alignSelf="center" textOverflow="ellipsis">
              <TextField
                id="slug"
                name="slug"
                label="Slug"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                variant="outlined"
                value={author.slug ?? ''}
                onChange={handleChange}
              />
            </Box>
            <Box alignSelf="center" ml={1}>
              <Button buttonType="hollow" onClick={suggestSlug}>
                Suggest&nbsp;slug
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="bio"
            name="bio"
            label="Bio"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={12}
            size="small"
            variant="outlined"
            value={author.bio ?? ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={
                  /* GraphQL-Codegen types are sometimes not straightforward to use
                  on the frontend. Here, we are converting Maybe<boolean> | null
                  to just boolean | null so that Material-UI accepts the value */
                  !!author.active
                }
                onChange={handleSwitch}
              />
            }
            name="isActive"
            label={author.active ? 'Active' : 'Inactive'}
            labelPlacement="end"
          />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Box p={1}>
              <Button buttonType="positive">Save</Button>
            </Box>
            {showCancelButton && (
              <Box p={1}>
                <Button buttonType="hollow-neutral" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
