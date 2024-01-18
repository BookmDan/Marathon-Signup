"""initial migration

Revision ID: d777acbeea37
Revises: b06781a6cc4f
Create Date: 2024-01-18 11:57:54.760034

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd777acbeea37'
down_revision = 'b06781a6cc4f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('race_event',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('race_name', sa.String(), nullable=False),
    sa.Column('organization', sa.String(), nullable=True),
    sa.Column('race_type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_race_event'))
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_user')),
    sa.UniqueConstraint('email', name=op.f('uq_user_email'))
    )
    op.create_table('credit_card_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('credit_card_number', sa.String(), nullable=False),
    sa.Column('name_on_card', sa.String(), nullable=True),
    sa.Column('expiration_date', sa.String(), nullable=True),
    sa.Column('cvv', sa.String(), nullable=True),
    sa.Column('street_address', sa.String(), nullable=True),
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('zipcode', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('save_my_card', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_credit_card_info_user_id_user')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_credit_card_info')),
    sa.UniqueConstraint('credit_card_number', name=op.f('uq_credit_card_info_credit_card_number'))
    )
    op.create_table('race_signup',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('waiver_accept', sa.Boolean(), nullable=True),
    sa.Column('tshirt_size', sa.String(), nullable=True),
    sa.Column('coupon_code', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('race_event_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['race_event_id'], ['race_event.id'], name=op.f('fk_race_signup_race_event_id_race_event')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_race_signup_user_id_user')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_race_signup')),
    sa.UniqueConstraint('user_id', name=op.f('uq_race_signup_user_id'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('race_signup')
    op.drop_table('credit_card_info')
    op.drop_table('user')
    op.drop_table('race_event')
    # ### end Alembic commands ###
