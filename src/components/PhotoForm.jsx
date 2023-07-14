import { faker } from "@faker-js/faker";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import albumsSlice from "../redux/albumsSlice";
import Button from "./Button";

function PhotoForm({ closeModal, albumId }) {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{
          photoId: faker.string.uuid(),
          photoUrl: "",
          photoAlt: "test",
          love: 0,
        }}
        validate={(values) => {
          const errors = {};
          if (values.photoUrl == "") {
            errors.photoUrl = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(albumsSlice.actions.addPhoto({ albumId, values }));
          closeModal();
          resetForm();
        }}
      >
        {({ values, setFieldValue, touched, errors }) => (
          <Form>
            {values.photoUrl ? (
              <div className="relative">
                <img
                  className="w-full"
                  src={values.photoUrl}
                  alt={values.photoAlt}
                />
                <div className="absolute top-5 right-5 z-10">
                  <Button
                    type={`button`}
                    style={"delete"}
                    onClick={() => {
                      setFieldValue("photoUrl", "");
                    }}
                    title={`Remove`}
                  />
                </div>
              </div>
            ) : (
              <>
                <Field
                  name={`photoUrl`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        const base64String = reader.result;
                        setFieldValue("photoUrl", base64String);
                        setFieldValue("photoAlt", file.name);
                      };
                    }
                  }}
                />

                {errors.photoUrl && touched.photoUrl && (
                  <div className="text-red-500 mt-2">{errors.photoUrl}</div>
                )}
              </>
            )}

            <div className="flex justify-between mt-5">
              <Button type={"submit"} title={`Add`} style={`primary`} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default PhotoForm;
