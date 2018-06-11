package com.eyepetizer_rn.ui.account;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.constraint.Group;
import android.support.v7.app.AppCompatActivity;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import com.eyepetizer_rn.R;

/**
 * @author by linecy.
 */
public class LoginRegisterActivity extends AppCompatActivity implements View.OnClickListener {

  private Group captchaGroup;
  private EditText etPhoneNumber;
  private EditText etCaptcha;
  private EditText etPassword;
  private TextView tvLoginBottomDetail;
  private Group thirdPartyLoginGroup;
  private TextView userLoginRegister;
  private Button btnLoginRegister;

  @Override protected void onCreate(@Nullable Bundle savedInstanceState) {

    getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
        WindowManager.LayoutParams.FLAG_FULLSCREEN);

    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_login_register);
    etPhoneNumber = (EditText) findViewById(R.id.et_phone_number);
    etCaptcha = (EditText) findViewById(R.id.et_captcha);
    etPassword = (EditText) findViewById(R.id.et_password);
    captchaGroup = (Group) findViewById(R.id.captcha_group);

    tvLoginBottomDetail = (TextView) findViewById(R.id.tv_login_bottom_detail);
    thirdPartyLoginGroup = (Group) findViewById(R.id.third_party_login_group);
    userLoginRegister = (TextView) findViewById(R.id.user_login_register);
    userLoginRegister.setOnClickListener(this);
    findViewById(R.id.iv_close).setOnClickListener(this);

    btnLoginRegister = (Button) findViewById(R.id.btn_login_register);
    btnLoginRegister.setOnClickListener(this);
    TextView tvBottomAgreement = (TextView) findViewById(R.id.tv_bottom_agreement);

    String header = getString(R.string.accept_agreement_for_use_app);
    String agreement = getString(R.string.user_agreement);
    SpannableString spannableString = new SpannableString(header + agreement);
    spannableString.setSpan(new ClickableSpan() {
      @Override public void onClick(View widget) {
        Toast.makeText(LoginRegisterActivity.this, "点击了用户协议", Toast.LENGTH_SHORT).show();
      }

      @Override public void updateDrawState(TextPaint ds) {
        ds.setColor(Color.WHITE);
        ds.setUnderlineText(false);
      }
    }, header.length(), spannableString.length(), Spanned.SPAN_INCLUSIVE_EXCLUSIVE);

    tvBottomAgreement.setMovementMethod(LinkMovementMethod.getInstance());
    tvBottomAgreement.append(spannableString);
  }

  @Override public void onClick(View v) {
    switch (v.getId()) {
      case R.id.iv_close:
        setResult(RESULT_CANCELED);
        finish();
        break;

      case R.id.user_login_register:
        //如果文本描述是用户注册的话,表明是当前是登录页，要设置成注册页
        if (getString(R.string.login_register).equals(userLoginRegister.getText().toString())) {
          userLoginRegister.setText(R.string.register_login);
          etPhoneNumber.setHint(R.string.register_edit_phone_hint);
          etCaptcha.setHint(R.string.register_edit_captcha_hint);
          etPassword.setHint(R.string.register_edit_password_hint);
          btnLoginRegister.setText(R.string.register);

          tvLoginBottomDetail.setVisibility(View.VISIBLE);
          captchaGroup.setVisibility(View.VISIBLE);
          thirdPartyLoginGroup.setVisibility(View.GONE);
        } else {
          userLoginRegister.setText(R.string.login_register);
          etPhoneNumber.setHint(R.string.login_edit_phone_hint);
          etPassword.setHint(R.string.login_edit_password_hint);
          btnLoginRegister.setText(R.string.login);

          tvLoginBottomDetail.setVisibility(View.GONE);
          captchaGroup.setVisibility(View.GONE);
          thirdPartyLoginGroup.setVisibility(View.VISIBLE);
        }

        break;

      case R.id.btn_login_register:
        Toast.makeText(this, "登录成功", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent();
        intent.putExtra("data", "{" + "\"accountName\":\"小明与小花\"" + "}");
        setResult(RESULT_OK, intent);
        finish();
        break;
    }
  }
}
